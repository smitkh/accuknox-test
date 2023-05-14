import React, { useEffect, useRef } from "react";

function OgmaGraph(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a new instance of the Ogma class
    const ogma = new ogma({
      container: containerRef.current,
    });

    // Add nodes and edges to the graph
    const node1 = ogma.graph.addNode({ id: "node1" });
    const node2 = ogma.graph.addNode({ id: "node2" });
    const edge = ogma.graph.addEdge({
      id: "edge",
      source: node1,
      target: node2,
    });

    // Customize the appearance and behavior of the graph
    ogma.view.fit();
    ogma.tools.selection.enable();
    ogma.tools.selection.on("change", (selection) => console.log(selection));

    // Cleanup function
    return () => {
      ogma.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}

export default OgmaGraph;
