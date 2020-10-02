import React,{useState,useEffect} from 'react'
import {Card,CardContent,Typography} from '@material-ui/core' 
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import {printPrettyNumberFormat} from './util'
import numeral from 'numeral'

const casesTypeColor = {
    cases:"#CC1034",
    recovered:"#7dd71d",
    deaths:"#fb4443",
}
function InfoBox({onClick,title,cases,total,name,active,casesType}) {
    const [casesworld,setCasesWorld] = useState({})

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCasesWorld(data);
        });
    },[])
    
    return (
        <Card className={`card ${active && `selected--${casesType}`}`} onClick={onClick}>
            <CardContent>
                <CircularProgressbarWithChildren 
                    value={cases}
                    maxValue={casesworld[name]}
                    styles={buildStyles({
                        path:{
                            transition:'stroke-dashoffset 0.5s ease 0s',
                        },
                        rotation:0,
                        strokeLinecap:'butt',
                        pathTransitionDuration: 1,
                        pathColor: `${active ? casesTypeColor[casesType]:'rgba(0,0,0,.5)'}`,
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                >
                    <div>
                        <h3 style={{color:`${active ? casesTypeColor[casesType]:'rgba(0,0,0)'}`}}>{printPrettyNumberFormat(cases)}</h3>
                        <Typography>
                            {numeral(total).format('0,0a')} Total
                        </Typography>
                    </div>
                </CircularProgressbarWithChildren>
                <Typography style={{fontWeight:'bold'}}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
        
    )
}

export default InfoBox
