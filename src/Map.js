import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "1ae622e9691363c6";

function Notebook() {
  const bubblemap2Ref = useRef();
  const data1Ref = useRef();
  const mapdata2Ref = useRef();
  const dataGroup2Ref = useRef();
  const clusterlegend2Ref = useRef();
  const radius2Ref = useRef();
  const radiuslegend2Ref = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "bubblemap2") return new Inspector(bubblemap2Ref.current);
      if (name === "data1") return new Inspector(data1Ref.current);
      if (name === "mapdata2") return new Inspector(mapdata2Ref.current);
      if (name === "dataGroup2") return new Inspector(dataGroup2Ref.current);
      if (name === "clusterlegend2") return new Inspector(clusterlegend2Ref.current);
      if (name === "radius2") return new Inspector(radius2Ref.current);
      if (name === "radiuslegend2") return new Inspector(radiuslegend2Ref.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={bubblemap2Ref} />
      <div ref={data1Ref} />
      <div ref={mapdata2Ref} />
      <div ref={dataGroup2Ref} />
      <div ref={clusterlegend2Ref} />
      <div ref={radius2Ref} />
      <div ref={radiuslegend2Ref} />
      <p>Credit: <a href="https://observablehq.com/d/1ae622e9691363c6">2. Clustering method by Dinesh Kumar Nanduri</a></p>
    </>
  );
}

export default Notebook;