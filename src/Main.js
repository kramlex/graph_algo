import React, {useRef, useState} from 'react'
import Graph from 'react-graph-vis'
import { Input, Button} from "antd";
import styled from 'styled-components'
import 'antd/dist/antd.css';
import {dfst} from "./algo";

const {TextArea} = Input;

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GraphsDiv = styled.div`
  display: flex;
`

const GraphDiv = styled.div`
  margin: 20px;
  border: black 1px solid;
  width: 45vw;
`

const TextAreaStyled = styled(TextArea)`
  margin-top: 50px;
  width: 500px;
  height: 500px;
`

const ButtonStyled = styled(Button)`
  margin: 10px;
  width: 200px;
`

const ButtonDfst = styled(Button)`
  //width: 200px;
`

const DfstDiv = styled.div`
  width: 400px;
  display: flex;
`

const graphInit1 = {
    nodes: [
        { id: 1, label: "Hello", title: "node 1 tootip text" },
    ],
}

const graph1init = {
    nodes: [
        { id: 1, label: "Hello", title: "node 1 tootip text" },
    ],
    edges: []
}
const graph2init = {
    nodes: [
        { id: 2, label: "World", title: "node 1 tootip text" },
    ],
    edges: [
        // {from : 1, to: 2},
    ]
}

function Kek() {
    const [graph1, setGraph1] = useState(graph1init)
    const [graph2, setGraph2] = useState(graph2init)
    const [aVal,setA] = useState(null)

    const [matrix, setMatrix] = useState(null)
    const ta = useRef(null)
    const iRef = useRef(null)

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        },
        height: "500px"
    };

    const events = {
        select: function(event) {
            let { nodes, edges } = event;
        }
    };

    const onReadTextArea = () => {
        const str = ta.current.state.value
        let data = str.replaceAll('\n', ' ')
            .split(' ')
            .filter(word => word !== '');
        let n = Math.sqrt(data.length)

        const newArr = []
        while(data.length) newArr.push(data.splice(0,n))
        const newGraph1 = {
            nodes: [
                ...newArr.map((value,index) => ({
                    id: index,
                    label : index.toString(),
                    title: ''
                }))
            ],
            edges: [
            ]
        }
        newArr.forEach((val,index) => {
            val.forEach((val2,index2) => {
                if(+val2 === 1) {
                    // console.log('kek')
                    newGraph1.edges.push({from:index, to: index2})
                }
            })
        })
        setGraph1(newGraph1)
        setMatrix(newArr)
    }

    const onChangeGraph2 = () => {
        const a = +iRef.current.state.value
        console.log()
        const res = dfst(a,matrix)
        console.log(res)
        const newGraph2 = {
            nodes: [
                ...matrix.map((value,index) => ({
                    id: index,
                    label : index.toString(),
                    title: ''
                }))
            ],
            edges: [
                ...res,
                ...res.map(value => {
                    return {from : value.to , to : value.from}
                })
            ]
        }

        setGraph2(newGraph2)
        // console.log(newGraph2.edges)
    }
    const clearDfst = () => {
        setGraph2(graph2init)
    }




    return (
        <AppDiv>
            <TextAreaStyled
                ref = {ta}
                placeholder = 'Enter adjacency matrix'
            />
            <ButtonStyled
                onClick = {onReadTextArea}
            >
                Enter
            </ButtonStyled>

            <DfstDiv>
                <Input
                    placeholder = {'Enter vertex index'}
                    ref = {iRef}
                />
                <ButtonDfst
                    onClick={onChangeGraph2}
                >
                    DFST
                </ButtonDfst>
                <Button
                    onClick={clearDfst}
                >
                    Clear DFST
                </Button>
            </DfstDiv>




            <GraphsDiv>
                <GraphDiv>
                    <Graph
                        graph={graph1}
                        options={options}
                        events={events}
                        getNetwork={network => {}}
                    />
                </GraphDiv>
                    <GraphDiv>
                        <Graph
                            graph={graph2}
                            options={options}
                            events={events}
                            getNetwork={network => {}}
                        />
                    </GraphDiv>
            </GraphsDiv>


        </AppDiv>

    );
}

export default Kek