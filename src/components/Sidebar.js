import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="switch-main">
          <div>All nodes</div>
          <label className="switch">
            <input
              type="checkbox"
            //   checked={isNodeGroup}
            //   onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
          <div>Group</div>
        </div>
      </div>
      {/* <div className="toolbar" id="ui">
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
  )} */}
    </>
  );
};

export default Sidebar;
