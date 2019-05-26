import React from 'react';
import { withRouter } from 'react-router';


//CSS
import './pantry.css'

//SERVICES
//import { postUser, postUserPrefTopics, postUserPrefTV } from '../services/main';





export default (props) => {
    let redPercentage = []; //<=20%
    let orangePercentage = []; //<=40%
    let yellowPercentage = []; //<=60%
    let bluePercentage = []; //<=80%
    let greenPercentage = []; //<=100%

    props.pantry.sort().map((e, i) => {
        if (e.percentage <= 0.20) {
            redPercentage.push(e)
            return redPercentage
        }
        else if (e.percentage <= 0.40 && e.percentage > 0.20) {
            orangePercentage.push(e)
            return orangePercentage
        }
        else if (e.percentage <= 0.60 && e.percentage > 0.40) {
            yellowPercentage.push(e)
            return yellowPercentage
        }
        else if (e.percentage <= 0.80 && e.percentage > 0.60) {
            bluePercentage.push(e)
            return bluePercentage
        }
        else {
            greenPercentage.push(e)
            return greenPercentage
        }
    })

    return (
        <>
            <div className="container" style={{height: "470px", overflow: "scroll"}}>
                <section>
                    {
                        redPercentage.length > 0 ? <div className="p-3 mb-1" style={{
                            overflowX: "scroll",
                            overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#6b0f1a",
                            backgroundImage: "linear-gradient(315deg, #6b0f1a 0%, #93322c 74%)"
                        }}>
                                                <p style={{display: "inline-block", fontWeight: "bold", color: "white"}}>Under 20%</p>
                            {
                                redPercentage.map((e, i) => {
                                    return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage*100).toString()}`+'%'}>
                                        <div>
                                            <div className="img">
                                                <span><img src={e.image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : null
                    }
                </section>
                <section>
                    {
                        orangePercentage.length > 0 ? <div className="p-3 mb-1" style={{
                            overflowX: "scroll",
                            overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#d14545",
                            backgroundImage: "linear-gradient(316deg, #d14545 0%, #d15a2f 74%)", opacity: "0.9"
                        }}>
                                                <p style={{display: "inline-block", fontWeight: "bold", color: "white"}}>20%-40%</p>
                            {
                                orangePercentage.map((e, i) => {
                                    return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage*100).toString()}`+'%'}>
                                        <div>
                                            <div className="img">
                                                <span><img src={e.image} style={{ height: "70px", opacity: ".95" }} className="effect8" data-position="bottom" data-tooltip="I am a tooltip" /></span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : null
                    }
                </section>
                <section>
                    {
                        yellowPercentage.length > 0 ? <div className="p-3 mb-1" style={{
                            overflowX: "scroll",
                            overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#b5c327",
                            backgroundImage: "linear-gradient(315deg, #b5c327 0%, #ffc907 74%)"
                        }}>
                        <p style={{display: "inline-block", fontWeight: "bold", color: "white"}}>40%-60%</p>

                            {
                                yellowPercentage.map((e, i) => {
                                    return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage*100).toString()}`+'%'}>
                                        <div>
                                            <div className="img">
                                                <span><img src={e.image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : null
                    }
                </section>
                <section>
                    {
                        bluePercentage.length > 0 ? <div className="p-3 mb-1" style={{
                            overflowX: "scroll",
                            overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#abe9cd",
                            backgroundImage: "linear-gradient(315deg, #06174c 0%, #3eadcf 74%)" 
                            
                        }}>
                        <p style={{display: "inline-block", fontWeight: "bold", color: "white"}}>60%-80%</p>

                            {
                                bluePercentage.map((e, i) => {
                                    return <div className="col-4" style={{ display: "inline-block" }} >
                                        <div>
                                            <div className="img">
                                                <span><img src={e.image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : null
                    }
                </section>
                <section>
                    {
                        greenPercentage.length > 0 ? <div className="p-3" style={{
                            overflowX: "scroll",
                            overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#f8ef42",
                            backgroundImage: "linear-gradient(315deg, #f8ef42 0%, #527433 74%)"
                        }}>
                        <p style={{display: "inline-block", fontWeight: "bold", color: "white"}}>Over 80%</p>
                            {
                                greenPercentage.map((e, i) => {
                                    return <div className="col-4" style={{ display: "inline-block" }}>
                                        <div>
                                            <div className="img">
                                                <span><img src={e.image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : null
                    }
                </section>
               
            </div>

        </>
    )
}

