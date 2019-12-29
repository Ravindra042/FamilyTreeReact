import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faEdit, faPlus, faCopy } from '@fortawesome/free-solid-svg-icons';
import { config } from './Constants';

class Address extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             address : this.props.address,
             editMode : 'N',
             memberId : this.props.memberId,
             backendUrl : config.url.API_URL
        }
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        });
        this.state.address[name] = value;
    }
    
    update = () => {
        const { address } = this.state;
        const { memberId } = this.state;
        if(address.id){
            console.log("updating address");
            axios.put(`${this.state.backendUrl}member/${memberId}/address/${address.id}`,  address )
            .then(res => {
                this.setState({  editMode : 'N'});
                this.props.history.push(`/familytree/members/${memberId}`);
            }).catch(error =>{
                console.log(error);
            });
        }else{
            console.log("creating address");
            axios.post(`${this.state.backendUrl}member/${memberId}/address`,  address )
            .then(res => {
                this.setState({  editMode : 'N'});
                this.props.history.push(`/familytree/members/${memberId}`);
            }).catch(error =>{
                console.log(error);
            });
        }
    }

    render() {
        const { address } = this.state;
        const { editMode } = this.state;
        return (
                <div>
                    <i><FontAwesomeIcon icon={faAddressCard} /></i> 
                    {editMode === 'N' ?
                        <div>
                            {address.id ? 
                                <div>
                                    <span onClick={() => this.setState({editMode : 'Y'})}><i><FontAwesomeIcon icon={faEdit} /></i></span>
                                    {address.line1 ? 
                                        <div><label>Line 1 : </label>{ address.line1 }</div> 
                                    : ''}
                                    {address.line2 ? 
                                        <div><label>Line 2 : </label>{ address.line2 }</div> 
                                    : ''}
                                    <div>
                                    {address.city ? 
                                        <span><label>City : </label>{ address.city }</span> 
                                    : ''}
                                    {address.taluka ? 
                                        <span style={{padding: 1 + 'em'}}><label>Taluka : </label>{ address.taluka }</span> 
                                    : ''}
                                    </div>
                                    {address.district ? 
                                        <span><label>District : </label>{ address.district }</span> 
                                    : ''}
                                    {address.state ? 
                                        <span style={{padding: 1 + 'em'}}><label>State : </label>{ address.state }</span> 
                                    : ''}
                                </div>
                                :
                                <div> 
                                    <span onClick={() => this.setState({editMode : 'Y'})}><i><FontAwesomeIcon icon={faPlus} /></i></span>
                                    <div>Not Available</div> 
                                </div>
                            }
                        </div>
                    :
                        <div>
                            <input type="text" name="line1" value={this.state.address.line1} onChange={this.myChangeHandler}  placeholder='Line 1'/>
                            <input type="text" name="line2" value={this.state.address.line2} onChange={this.myChangeHandler}  placeholder='Line 2'/>
                            <br/>
                            <input type="text" name="city" value={this.state.address.city} onChange={this.myChangeHandler}  placeholder='City'/>
                            <input type="text" name="taluka" value={this.state.address.taluka} onChange={this.myChangeHandler}  placeholder='Taluka'/>
                            <br />
                            <input type="text" name="district" value={this.state.address.district} onChange={this.myChangeHandler}  placeholder='District'/>
                            <input type="text" name="state" value={this.state.address.state} onChange={this.myChangeHandler}  placeholder='State'/>
                            <br />
                            <input type="button" value="UPDATE" onClick={this.update}/>
                        </div>
                    }
                </div>
        )
    }
}

export default withRouter(Address);
