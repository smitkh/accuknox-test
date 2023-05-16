import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupNode } from "../redux/featuresSlice";
import { makeNodegroup } from "../constant/graphData";
import { debounce } from "./common/debounce";

const Sidebar = ({ cyRef }) => {
  const { allNodesShow, nodes, edges } = useSelector((state) => state.graph);
  const [showEdges, setShowEdges] = useState(true);
  const dispatch = useDispatch();

  const updateData = (data) => {
    console.log(data, "cyref");
    cyRef.current.batch(() => {
      cyRef.current.elements().remove();
      cyRef.current.add(data);
      cyRef.current.layout({ name: "cola" }).run();
    });
  };

  const handleToggle = () => {
    let isShow = !allNodesShow;
    if (isShow) {
      const result = makeNodegroup();
      updateData(result);
    } else {
      updateData({ nodes, edges });
    }
    dispatch(groupNode(isShow));
  };

  const handleZoom = (level) => {
    const cyZoom = cyRef.current;
    if (!cyZoom) return;
    cyRef.current.batch(() => {
      cyZoom.zoom(cyZoom.zoom() * level);
    });
  };

  const debouncedHandleZoom = debounce(handleZoom, 200);

  const handleToggleEdges = useCallback(() => {
    cyRef.current.batch(() => {
      cyRef.current.elements("edge").forEach((edge) => {
        if (showEdges) {
          edge.hide();
        } else {
          edge.show();
        }
      });
    });
  }, [cyRef, showEdges]);

  return (
    <>
      <div className="sidebar">
        <div className="switch-main">
          <div>All nodes</div>
          <label className="switch">
            <input
              type="checkbox"
              checked={allNodesShow}
              onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
          <div>Group</div>
        </div>
        <button
          onClick={() => {
            handleToggleEdges();
            setShowEdges((show) => !show);
          }}
        >
          Toggle Edges
        </button>
        <button onClick={() => debouncedHandleZoom(1.1)}>Zoom In</button>
        <button onClick={() => debouncedHandleZoom(0.9)}>Zoom Out</button>
      </div>
    </>
  );
};

export default Sidebar;
