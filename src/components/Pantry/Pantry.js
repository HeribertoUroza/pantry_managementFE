import React from 'react';
import { withRouter } from 'react-router';
import { Spinner } from 'reactstrap';

//CSS
import './pantry.css'

//SERVICES
import { readPantry } from '../../services/main';

let redPercentage = []; //<=20%
let orangePercentage = []; //<=40%
let yellowPercentage = []; //<=60%
let bluePercentage = []; //<=80%
let greenPercentage = []; //<=100%

class Pantry extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            pantry: null,
            finishedLoading: false,
            pantryUpdates: 0,
        };
    };

    componentDidMount = () => this.getPantry();

    componentDidUpdate = () => {
        const { pantry, pantryUpdates } = this.state;
        const { updates, } = this.props;
        if (!pantry) {
            this.getPantry();
        } else if (updates > pantryUpdates) {
            this.getPantry();
        } else {
            return;
        }
    };

    getPantry = _ => {
        const { id, updates } = this.props;
        if (id !== 0) {
            readPantry(id)
                .then((response) => {
                    this.setState(() => ({
                        pantry: response.data.data,
                        pantryUpdates: updates,
                    }));
                })
                .then(() => {
                    if (this.state.pantry !== undefined) {
                        this.state.pantry.sort().map((e, i) => {
                            e.percentage = e.weight_left / e.product_gram_weight
                            if (e.percentage <= 0.20) {
                                redPercentage.push(e)
                                return redPercentage
                            }
                            else if (e.percentage <= 0.40 && e.percentage > 0.20) {
                                e.percentage = e.weight_left / e.product_gram_weight
                                orangePercentage.push(e)
                                return orangePercentage
                            }
                            else if (e.percentage <= 0.60 && e.percentage > 0.40) {
                                e.percentage = e.weight_left / e.product_gram_weight
                                yellowPercentage.push(e)
                                return yellowPercentage
                            }
                            else if (e.percentage <= 0.80 && e.percentage > 0.60) {
                                e.percentage = e.weight_left / e.product_gram_weight
                                bluePercentage.push(e)
                                return bluePercentage
                            }
                            else {
                                e.percentage = e.weight_left / e.product_gram_weight
                                greenPercentage.push(e)
                                return greenPercentage
                            }
                        })
                    };
                    this.setState(() => ({
                        finishedLoading: true,
                    }));
                });
        };
    };

    renderPantry = _ => {
        const {pantry,} = this.state;
        if (!pantry) {
            return(
                <>
                    <div className='container'>
                        <div className='col-4 my-5 py-5 text-center'>
                            <Spinner color="dark" />
                        </div>
                    </div>
                </>
            )
        } else if (pantry.length === 0) {
            return(
                <>
                    <div className='container px-0 mx-0'>
                        <div className='col-4 my-5 py-5 text-center px-0 mx-0'>
                            <p style={{fontSize: 36}} className='font-weight-bold'>No items</p>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <>
                            <section>
                                {
                                    redPercentage.length > 0 ? <div className="p-3 mb-1" style={{
                                        overflowX: "scroll",
                                        overflowY: "hidden", whiteSpace: "nowrap", backgroundColor: "#6b0f1a",
                                        backgroundImage: "linear-gradient(315deg, #6b0f1a 0%, #93322c 74%)"
                                    }}>
                                        <p style={{ display: "inline-block", fontWeight: "bold", color: "white" }}>Under 20%</p>
                                        {
                                            redPercentage.map((e, i) => {
                                                return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage * 100).toString()}` + '%'}>
                                                    <div>
                                                        <div className="img">
                                                            <span><img src={e.percentage_image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
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
                                        <p style={{ display: "inline-block", fontWeight: "bold", color: "white" }}>20%-40%</p>
                                        {
                                            orangePercentage.map((e, i) => {
                                                return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage * 100).toString()}` + '%'}>
                                                    <div>
                                                        <div className="img">
                                                            <span><img src={e.product_image} style={{ height: "70px", opacity: ".95" }} className="effect8" data-position="bottom" data-tooltip="I am a tooltip" /></span>
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
                                        <p style={{ display: "inline-block", fontWeight: "bold", color: "white" }}>40%-60%</p>

                                        {
                                            yellowPercentage.map((e, i) => {
                                                return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage * 100).toString()}` + '%'}>
                                                    <div>
                                                        <div className="img">
                                                            <span><img src={e.product_image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
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
                                        <p style={{ display: "inline-block", fontWeight: "bold", color: "white" }}>60%-80%</p>

                                        {
                                            bluePercentage.map((e, i) => {
                                                return <div className="col-4" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage * 100).toString()}` + '%'} >
                                                    <div>
                                                        <div className="img">
                                                            <span><img src={e.product_image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
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
                                        <p style={{ display: "inline-block", fontWeight: "bold", color: "white" }}>Over 80%</p>
                                        {
                                            greenPercentage.map((e, i) => {
                                                return <div className="col-6" style={{ display: "inline-block" }} data-toggle="tooltip" data-placement="top" title={`${(e.percentage * 100).toString()}` + '%'}>
                                                    <div>
                                                        <div className="img">
                                                            <span><img src={e.product_image} style={{ height: "70px", opacity: ".95" }} className="effect8" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div> : null
                                }
                            </section>
                        </>
            )
        }
    }

    render() {
        return (
            <>
                <div className="container-fluid" style={{ height: "470px", overflow: "scroll", width: "100%" }}>
                    {
                        this.renderPantry()
                    }
                </div>
            </>
        )
    }
}

export default withRouter(Pantry);