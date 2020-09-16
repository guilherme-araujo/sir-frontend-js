import React, { useState, useEffect } from 'react';
import { Graph } from "react-d3-graph";
import graphGen from 'ngraph.generators';
import toJSON from 'ngraph.tojson';

function GraphView() {

    const [nodeList, setNodeList] = useState([]);
    const [wgJSON, setWgJSON] = useState({
        nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
        links: [
            { source: "Harry", target: "Sally" },
            { source: "Harry", target: "Alice" },
        ],
    });

    const wgGraph = graphGen.wattsStrogatz(20, 5, 0.4);

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    useEffect(() => {
        if (nodeList.length === 0) {
            const l = []
            wgGraph.forEachNode((node) => {
                l.push(node);
            })
            setNodeList(l);

            setWgJSON(JSON.parse(toJSON(wgGraph,
                function nodeTransform(node) {
                    return { id: node.id, data: node.data };
                },
    
                function linkTransform(link) {
                    return { source: link.fromId, target: link.toId, data: link.data };
                }
            )));
        }
        
        console.log(wgJSON)
    }, [nodeList.length, wgGraph, wgJSON])

    return (
        <div>
            { wgJSON === '' ? (
                <p>Loading...</p>
            ) : (
                    <div>
                        <p>Foi</p>
                        <Graph
                            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                            data={wgJSON}
                            config={myConfig} />
                    </div>
                )}

            { nodeList.map((node, index) => (
                <div key={index}>
                    <p >{node.id}</p>
                    <p >{node.links.toString()}</p>
                    <p >{node.data}</p>
                </div>

            ))}
            <br />
            { toJSON(wgGraph,
                function nodeTransform(node) {
                    return { id: node.id, data: node.data };
                },

                function linkTransform(link) {
                    return { source: link.fromId, target: link.toId, data: link.data };
                }
            )}
        </div>
    )
}

export default GraphView;