import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import cytoscape from "cytoscape";
import klay from "cytoscape-klay";
import cola from "cytoscape-cola";
import popper from "cytoscape-popper";
import cydagre from "cytoscape-dagre";
import cyqtip from "cytoscape-qtip";
import contextMenus from "cytoscape-context-menus";
// import CSS as well
import "cytoscape-context-menus/cytoscape-context-menus.css";
import "./../../graph.css";
import { debounce } from "./debounce";
import { NodeDetailsModal } from "./NodeDetailsModal";

cytoscape.use(cola);
cytoscape.use(popper);
cytoscape.use(cydagre);
cytoscape.use(cyqtip);
cytoscape.use(klay);
cytoscape.use(contextMenus);

const personIcon = "\uf007";
const companyIcon = "\uf1ad";
const isShareholderType = "IS-SHAREHOLDER";

const getNodeColor = (node) => {
  const group = node.getData("group");
  if (group === "purple") {
    return "#67328E";
  }
  if (group === "green") {
    return "#328E5B";
  }
  return "#DE8B53";
};

const getEdgeColor = (edge) => {
  if (edge.getData("type") === isShareholderType) {
    return "#89C7D6";
  }
  return "#8E6538";
};

const CytoscapeGraph = ({ nodes, edges, style, layout }) => {
  const cyRef = useRef(null);
  const [modalNode, setModalNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEdges, setShowEdges] = useState(true);
  const cy = useRef(null);

  const [isNodeGroup, setNodeGroup] = useState(false);

  const makeNodegroup = () => {
    const personNodes = nodes.filter((item) => item.data.type !== "company");
    const group = nodes.reduce((prev, next) => {
      prev[next.data.group] = prev[next.data.group]
        ? [...prev[next.data.group], { ...next }]
        : [{ ...next }];
      return { ...prev };
    }, {});
    const newNodes = Object.keys(group).map((item) => ({
      data: {
        id: `${item}`,
        label: `${item} group`,
        group: `${item} group`,
        type: "company group",
      },
    }));
    const finalNode = [...personNodes, ...newNodes];
    const newEdges = edges.reduce((prev, next) => {
      if (
        next.data.type === "IS-SHAREHOLDER" &&
        next.data.source.includes("company") &&
        next.data.target.includes("company")
      ) {
        return [...prev];
      } else {
        const modifyEdge = {
          data: {
            ...next.data,
            source: next.data.source.includes("company")
              ? nodes.find((item) => item.data.id === next.data.source)?.data
                  .group
              : next.data.source,
            target: next.data.target.includes("company")
              ? nodes.find((item) => item.data.id === next.data.target)?.data
                  .group
              : next.data.target,
          },
        };
        return [...prev, modifyEdge];
      }
    }, []);

    cy.current.batch(() => {
      cy.current.elements().remove();
      cy.current.add({ nodes: finalNode, edges: newEdges });
      cy.current.layout(selectLayout()).run();
    });
    return { nodes: finalNode, edges: newEdges };
  };

  const updateData = (data) => {
    cy.current.batch(() => {
      cy.current.elements().remove();
      cy.current.add(data);
      cy.current.layout(selectLayout()).run();
    });
  };
  const handleToggle = () => {
    if (!isNodeGroup) {
      const result = makeNodegroup();
      updateData(result);
    } else {
      updateData({ nodes, edges });
    }
    setNodeGroup(!isNodeGroup);
  };

  const selectLayout = useCallback(
    () => ({
      name: layout,
      nodeDimensionsIncludeLabels: true,
      animate: false,
      preload: true,
    }),
    [layout]
  );

  const showDescendants = useCallback((node) => {
    const children = node.successors();
    const descendants = node.descendants();
    descendants.forEach((descendant) => {
      descendant.style("display", "element");
    });
    node.style("display", "element");
    children.forEach((child) => {
      child.style("display", "element");
    });
  }, []);

  const hideDescendants = useCallback((node) => {
    const children = node.successors();
    const descendants = node.descendants();
    descendants.forEach((descendant) => {
      descendant.style("display", "none");
      descendant.unselect();
    });
    children.forEach((child) => {
      child.style("display", "none");
      child.unselect();
    });
    node.style("display", "element");
    node.unselect();
  }, []);

  const handleToggleEdges = useCallback(() => {
    cy.current.batch(() => {
      cy.current.elements("edge").forEach((edge) => {
        if (showEdges) {
          edge.hide();
        } else {
          edge.show();
        }
      });
    });
    setShowEdges((show) => !show);
  }, [cy, showEdges]);

  useLayoutEffect(() => {
    if (cyRef.current) {
      cy.current = cytoscape({
        container: cyRef.current,
        elements: { nodes, edges },
        style,
        layout: selectLayout(),
      });

      cy.current.ready(() => {
        cy.current.layout({ name: layout }).run();
        cyRef.current.style.visibility = "visible";
      });
      cy.current.contextMenus({
        evtType: "cxttap",
        menuItems: [
          {
            id: "expand-node",
            content: "Expand",
            tooltipText: "Expand node",
            selector: "node",
            onClickFunction: function (event) {
              const node = event.target;
              showDescendants(node);
            },
          },
          {
            id: "collapse-node",
            content: "Collapse",
            tooltipText: "Collapse node",
            selector: "node",
            onClickFunction: function (event) {
              const node = event.target;
              const component = node.connectedEdges().add(node).components();
              if (component.length > 1) {
                alert(
                  "Cannot collapse node - would create disconnected graph."
                );
                return;
              }
              node.unselect();
              hideDescendants(node);
            },
          },
        ],
        menuItemClasses: ["my-context-menu-item"],
        contextMenuClasses: ["my-context-menu"],
      });
      cy.current.on("tap", "node", (event) => {
        const node = event.target;
        cy.current.batch(() => {
          // Display the node details in the modal
          setModalNode(node);
          setIsModalOpen(true);
        });
      });

      cy.current.on("tap", "edge", (event) => {
        setSelectedEdge(event.target);
        event.target.addClass("selected-edge");
        event.target.source().addClass("selected-node");
        event.target.target().addClass("selected-node");
      });

      cy.current.on("tapstart", (event) => {
        if (event.target === cy) {
          setSelectedEdge(null);
          cy.elements().removeClass("selected-node selected-edge");
        }
      });
    }

    return () => {
      cy.current.destroy();
    };
  }, [nodes, edges, selectLayout, layout, style]);

  const handleZoom = (level) => {
    const cyZoom = cy.current;
    if (!cyZoom) return;
    cyZoom.zoom(cyZoom.zoom() * level);
  };

  const debouncedHandleZoom = debounce(handleZoom, 200);

  return (
    <>
      <div
        ref={cyRef}
        className="cy"
        style={{ height: "100%", width: "100%" }}
      />
      <div className="toolbar" id="ui">
        <form>
          <div className="section mode">
            <h3>Company analysis</h3>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div>All nodes</div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isNodeGroup}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>
              <div>Group</div>
            </div>
            <div className="switch switch--horizontal">
              <input
                type="radio"
                name="edge-group"
                value="detail"
                checked="checked"
              />
              <label for="detail">All Edges</label>
              <input type="radio" name="edge-group" value="group" />
              <label for="group">Backbone</label>
              <span className="toggle-outside">
                <span className="toggle-inside"></span>
              </span>
            </div>
          </div>
          <div className="controls">
            <button id="layout" className="btn menu">
              Layout
            </button>
          </div>
        </form>
        <div className="section mode" id="details"></div>
      </div>
      <button onClick={handleToggleEdges}>Toggle Edges</button>
      <button onClick={() => debouncedHandleZoom(1.1)}>Zoom In</button>
      <button onClick={() => debouncedHandleZoom(0.9)}>Zoom Out</button>

      {isModalOpen && (
        <div>
          <div
            className="modal-overlay"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="modal">
            <NodeDetailsModal node={modalNode} />
          </div>
        </div>
      )}
      {selectedEdge && (
        <div className="connection-details">
          <h2>{selectedEdge.id()}</h2>
          <p>{selectedEdge.data("description")}</p>
          <button onClick={() => setSelectedEdge(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default React.memo(CytoscapeGraph);
