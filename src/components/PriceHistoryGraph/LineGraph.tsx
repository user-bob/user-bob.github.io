import React, {FC} from "react";
import {
    CartesianGrid,
    Label,
    LabelList,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export interface GraphData {
    month: number;

    [key: string]: number;
}

export interface LineGraphProps {
    data: GraphData[];
}

export interface LineGraphState {
    formatted?: any[];
    left?: string;
    right?: string;
    refAreaLeft: string;
    refAreaRight: string;
    top?: string;
    bottom?: string;
    animation?: boolean;
}

const strokeColors = [
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#6366F1',
    '#8B5CF6',
    '#EC4899',
    '#F97316',
    '#14B8A6',
    '#60A5FA',
    '#A5B4FC',
    '#D1D5DB',
]

const formatMonth = (month: number) => {
    switch (month) {
        case 1:
            return 'Jan';
        case 2:
            return 'Feb';
        case 3:
            return 'Mar';
        case 4:
            return 'Apr';
        case 5:
            return 'May';
        case 6:
            return 'Jun';
        case 7:
            return 'Jul';
        case 8:
            return 'Aug';
        case 9:
            return 'Sep';
        case 10:
            return 'Oct';
        case 11:
            return 'Nov';
        default:
            return 'Dec';
    }
}
const formatData = (data: GraphData[]) => {
    const formatted: any[] = []
    data.map((item) => {
        const {month, ...rest} = item;
        formatted.push({
            month: formatMonth(month),
            ...rest
        })
    })
    return formatted;
}
const CustomizedLabel: FC<any> = (props: any) => {
    const {x, y, stroke, value} = props;

    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={16} textAnchor="middle">
            ${value}
        </text>
    );
};

const CustomizedAxisTick: FC<any> = (props: any) => {
    const {x, y, payload} = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-35)"
            >
                {payload.value}
            </text>
        </g>
    );
};

const initialState = (data: GraphData[]) => {
    return {
        data: data,
        left: "dataMin",
        right: "dataMax",
        refAreaLeft: "",
        refAreaRight: "",
        top: "dataMax+1",
        bottom: "dataMin-1",
        animation: true
    };
}

const getAxisYDomain = (
    from: number,
    to: number,
    ref: string,
    offset: number,
    data: any[]
) => {
    const refData: any[] = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach((d) => {
        if (d[ref] > top) top = d[ref];
        if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
};

// export default class LineGraph extends Component<any, any> {
//     private readonly initial: any;
//
//     constructor(props: any) {
//         super(props);
//         this.initial = props.data;
//         this.state = initialState(props.data);
//     }
//
//     zoom() {
//         let {refAreaLeft, refAreaRight} = this.state;
//         const {data} = this.state;
//
//         if (refAreaLeft === refAreaRight || refAreaRight === "") {
//             this.setState(() => ({
//                 refAreaLeft: "",
//                 refAreaRight: ""
//             }));
//             return;
//         }
//
//         // xAxis domain
//         if (refAreaLeft > refAreaRight)
//             [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
//
//         // yAxis domain
//         const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1, this.initial);
//
//         this.setState(() => ({
//             refAreaLeft: "",
//             refAreaRight: "",
//             data: data.slice(),
//             left: refAreaLeft,
//             right: refAreaRight,
//             bottom,
//             top,
//         }));
//     }
//
//     zoomOut() {
//         const {data} = this.state;
//         this.setState(() => ({
//             data: data.slice(),
//             refAreaLeft: "",
//             refAreaRight: "",
//             left: "dataMin",
//             right: "dataMax",
//             top: "dataMax+1",
//             bottom: "dataMin",
//         }));
//     }
//
//     render() {
//         const {
//             data,
//             left,
//             right,
//             refAreaLeft,
//             refAreaRight,
//             top,
//             bottom,
//         } = this.state;
//
//         console.log(this.state);
//
//         return (
//             <div className="highlight-bar-charts" style={{userSelect: "none"}}>
//                 <button
//                     type="button"
//                     className="btn update"
//                     onClick={this.zoomOut.bind(this)}
//                 >
//                     Zoom Out
//                 </button>
//
//                 <ResponsiveContainer width="100%" height='100%'>
//                     <LineChart
//                         data={data}
//                         onMouseDown={(e: any) =>
//                             this.setState({refAreaLeft: e.activeLabel})
//                         }
//                         onMouseMove={(e: any) =>
//                             this.state.refAreaLeft &&
//                             this.setState({refAreaRight: e.activeLabel})
//                         }
//                         // eslint-disable-next-line react/jsx-no-bind
//                         onMouseUp={this.zoom.bind(this)}
//                     >
//                         <CartesianGrid strokeDasharray="3 3"/>
//                         <XAxis
//                             allowDataOverflow
//                             dataKey="name"
//                             domain={[left, right]}
//                             type="number"
//                             tick={<CustomizedAxisTick/>}
//                         />
//                         <YAxis
//                             allowDataOverflow
//                             domain={[bottom, top]}
//                             type="number"
//                         >
//                             <Label value="Price in USD" offset={0} position="left" angle={-90}/>
//                         </YAxis>
//                         <Tooltip/>
//                         {
//                             Object.keys(data[0]).filter((key) => key !== 'name').map((key, index) => (
//                                 <Line key={index} type="natural" dataKey={key} stroke={strokeColors[index]}
//                                       animationDuration={300}>
//                                     <LabelList content={<CustomizedLabel stroke={strokeColors[index]}/>}/>
//                                 </Line>
//                             ))
//                         }
//                         {refAreaLeft && refAreaRight ? (
//                             <ReferenceArea
//                                 x1={refAreaLeft}
//                                 x2={refAreaRight}
//                                 strokeOpacity={0.3}
//                             />
//                         ) : null}
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         );
//     }
// }
export const LineGraph = ({data, idx}: { data: any, idx?: number }) => {
    // const formattedData = formatData(data);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis tick={<CustomizedAxisTick/>}/>
                <YAxis>
                    <Label value="Price in USD" offset={0} position="left" angle={-90}/>
                </YAxis>
                <Tooltip/>
                <Legend verticalAlign="top" height={36}/>
                {
                    Object.keys(data[0]).filter((key) => key !== 'month').map((key, index) => (
                        <Line key={index} type="monotone" dataKey={key} stroke={strokeColors[idx ?? index]}>
                            <LabelList content={<CustomizedLabel stroke={strokeColors[idx ?? index]}/>}/>
                        </Line>
                    ))
                }
            </LineChart>
        </ResponsiveContainer>
    )
}


// return (
//     <ResponsiveContainer width="100%" height={400}>
//         <LineChart
//             width={500}
//             height={300}
//             data={formattedData}
//             margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//             }}
//         >
//             <CartesianGrid strokeDasharray="3 3"/>
//             <XAxis dataKey="month" tick={<CustomizedAxisTick/>}/>
//             <YAxis>
//                 <Label value="Price in USD" offset={0} position="left" angle={-90}/>
//             </YAxis>
//             <Tooltip/>
//             <Legend verticalAlign="top" height={36}/>
//             {
//                 Object.keys(formattedData[0]).filter((key) => key !== 'month').map((key, index) => (
//                     <Line key={index} type="monotone" dataKey={key} stroke={strokeColors[index]}>
//                         <LabelList content={<CustomizedLabel stroke={strokeColors[index]}/>}/>
//                     </Line>
//                 ))
//             }
//         </LineChart>
//     </ResponsiveContainer>
// )