import React from 'react';

import './modal.css';


class Nutrition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }







    componentDidMount() {

    }



    render() {
        return (
            <>
                <div id="nutritionfacts">
                    <table  cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <td class="header text-center">Nutrition Facts</td>
                        </tr>
                            <tr>
                                <td><div class="serving">Per <span class="highlighted">{this.props.totalWeight/this.props.yield} g</span> Serving Size</div></td>
                            </tr>
                            <tr style={{height: "7px"}}>
                                <td bgcolor="#000000"></td>
                            </tr>
                            <tr>
                                <td style={{fontSize: "7pt"}}><div class="line">Amount Per Serving</div></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Calories <div class="weight">{this.props.calories/this.props.yield}</div></div><div style={{paddingTop: "1px", float: "right"}} class="labellight">Calories from Fat <div class="weight">{this.props.calFromFat/this.props.yield}</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><div class="line"><div class="dvlabel">% Daily Value<sup>*</sup></div></div></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Total Fat <div class="weight">{this.props.fat/this.props.yield}g</div></div>
                                        <div class="dv">{((this.props.fat/this.props.yield)/65)*100}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="indent">
                                    <div class="line">
                                        <div class="labellight">Saturated Fat <div class="weight">{this.props.satFat/this.props.yield}g</div></div>
                                        <div class="dv">{((this.props.satFat/this.props.yield)/20)*100}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="indent">
                                    <div class="line">
                                        <div class="labellight"><i>Trans</i> Fat <div class="weight">{this.props.trans/this.props.yield}g</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Cholesterol <div class="weight">{this.props.chol/this.props.yield}mg</div></div>
                                        <div class="dv">{((this.props.chol/this.props.yield)/300)*100}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Sodium <div class="weight">618mg</div></div>
                                        <div class="dv">26%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Total Carbohydrates <div class="weight">32.2g</div></div>
                                        <div class="dv">11%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="indent">
                                    <div class="line">
                                        <div class="labellight">Dietary Fiber <div class="weight">5.2g</div></div>
                                        <div class="dv">21%</div>
                                    </div></td>
                            </tr>
                            <tr>
                                <td class="indent">
                                    <div class="line">
                                        <div class="labellight">Sugars <div class="weight">3.3g</div></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="line">
                                        <div class="label">Protein <div class="weight">11.4g</div>
                                        </div>
                                    </div></td>
                            </tr>
                            <tr style={{height: "7px"}}>
                                <td style={{backgroundColor: "black"}}></td>
                            </tr>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0" border="0" class="vitamins">
                                        <tbody>
                                            <tr>
                                                <td>Vitamin A &nbsp;&nbsp; 10%</td>
                                                <td class="text-center">•</td>
                                                <td class="text-right">Calcium &nbsp;&nbsp; 19%</td>
                                            </tr>
                                            <tr>
                                                <td>Vitamin B &nbsp;&nbsp; 22%</td>
                                                <td class="text-center">•</td>
                                                <td class="text-right">Iron &nbsp;&nbsp; 13%</td>
                                            </tr>
                                            <tr>
                                                <td>Vitamin C &nbsp;&nbsp; 16%</td>
                                                <td class="text-center">•</td>
                                                <td class="text-right">Potassium &nbsp;&nbsp; 7%</td>
                                            </tr>
                                            <tr>
                                                <td>Vitamin D &nbsp;&nbsp; 5%</td>
                                                <td class="text-center">•</td>
                                                <td class="text-right">Folate &nbsp;&nbsp; 40%</td>
                                            </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td><div class="line">
                                    <div class="labellight">* Based on a regular <a href="#">2000 calorie diet</a>
                                        <br /><br /><i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
                                    </div>
                                </div>
                                </td>
                            </tr>
                        </tbody></table>
                </div>


            </>
        );
    }
}


export default Nutrition;