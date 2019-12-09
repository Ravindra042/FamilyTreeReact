import React, { Component } from 'react';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faAddressCard, faEdit, faPlus, faCopy } from '@fortawesome/free-solid-svg-icons'

class Admin extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            members : [],
            fromMember : {},
            fromMemberAddress : {},
            toMember :{},
            toMembers :[],
            backendUrl : "http://localhost:8093/familytree/"
        }
    }

    fetchMembers = () => {
        axios.get(`${this.state.backendUrl}member`)
          .then(response => {
            console.log(response.data);
            this.setState({members:response.data})
          }).catch(error =>{
              console.log(error);
          });
      }

      fetchAddress = () => {
        axios.get(`${this.state.backendUrl}member/${this.state.fromMember.id}/address`)
          .then(response => {
            console.log(response.data);
            if(null != response.data && ""!== response.data){
                this.setState({fromMemberAddress:response.data})
            }
          }).catch(error =>{
              console.log(error);
          });
    }

      componentDidMount() {
        this.fetchMembers();
      };

      fromMemberChangeHandler = (event) => {
        if("NA" === event.target.value){
            this.setState({
                fromMember : {},
                fromMemberAddress : {},
                toMember:{},
                toMembers:[] 
            });
        }else{
            this.setState({
                fromMember : this.state.members[event.target.value],
                fromMemberAddress : {},
                toMember:{},
                toMembers:[]
            }, () => {this.fetchAddress()});
        }
    }

    toMemberChangeHandler = (event) => {
        if("NA" === event.target.value){
            this.setState({
                toMember : {}
            });
        }else{
            this.setState({
                toMember : this.state.members[event.target.value]
            });
        }
    }

    pushToMembers = () => {
        if (this.state.toMembers === undefined) 
        {
            return
        }
        if (this.state.fromMember.id === this.state.toMember.id)
        {
            return
        }
          let toMembers = new Set(this.state.toMembers)
          toMembers.add(this.state.toMember)
        this.setState(prevState => ({
            toMembers: Array.from(toMembers)
          }))
    }

    copyAddress = () => {
        const { toMembers } = this.state
        axios.post(`${this.state.backendUrl}member/${this.state.fromMember.id}/address/copy`,toMembers )
            .then(
                res => {
                    this.props.history.push(`/familytree/members`);
                }
            ).catch(error =>{
                console.log(error);
            });
    }

    render() {
        return (
            <div className="page-style">
                <h3>Welcome Ravi..</h3>
                <div>
                    <div>
                        <label style={{padding: 1 + 'em'}}>From Member</label>
                        <select style={{width: 20 + 'em'}} className="form-entity" name="fromMember" 
                                onChange={this.fromMemberChangeHandler}>
                            <option  value='NA'>Not Defined</option>
                            {this.state.members.map((member, index) => (
                                <option key={index} value={index}>{member.firstName} {member.lastName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        {this.state.fromMemberAddress.id ? 
                                <div>
                                    <div>
                                        {this.state.fromMemberAddress.line1 ? 
                                            <div><label>Line 1 : </label>{ this.state.fromMemberAddress.line1 }</div> 
                                        : ''}
                                        {this.state.fromMemberAddress.line2 ? 
                                            <div><label>Line 2 : </label>{ this.state.fromMemberAddress.line2 }</div> 
                                        : ''}
                                        <div>
                                        {this.state.fromMemberAddress.city ? 
                                            <span><label>City : </label>{ this.state.fromMemberAddress.city }</span> 
                                        : ''}
                                        {this.state.fromMemberAddress.taluka ? 
                                            <span style={{padding: 1 + 'em'}}><label>Taluka : </label>{ this.state.fromMemberAddress.taluka }</span> 
                                        : ''}
                                        </div>
                                        {this.state.fromMemberAddress.district ? 
                                            <span><label>District : </label>{ this.state.fromMemberAddress.district }</span> 
                                        : ''}
                                        {this.state.fromMemberAddress.state ? 
                                            <span style={{padding: 1 + 'em'}}><label>State : </label>{ this.state.fromMemberAddress.state }</span> 
                                        : ''}
                                    </div>
                                    <div>
                                        Select Members to copy this address
                                        <select style={{width: 20 + 'em'}} className="form-entity" name="toMember" 
                                                onChange={this.toMemberChangeHandler}>
                                            <option  value='NA'>Not Defined</option>
                                            {this.state.members.map((member, index) => (
                                                <option key={index} value={index}>{member.firstName} {member.lastName}</option>
                                            ))}
                                        </select>
                                        <input style={{width : 10 + 'rem'}} type="button" value="ADD" onClick={this.pushToMembers}></input>
                                    </div>
                                    <div>
                                    {
                                        this.state.toMembers.map(member => (
                                            <div key = {member.id}>{member.firstName} {member.lastName}</div>
                                        ))
                                    }
                                    </div>
                                    <input style={{width : 10 + 'rem'}} type="button" value="COPY" onClick={this.copyAddress}></input>
                                </div>
                                :
                                <div> 
                                    {this.state.fromMember.id ? 
                                    <div>Address of <b><i>{this.state.fromMember.firstName}</i></b> is not defined, Please select different member</div> 
                                    : 
                                    <div>Please select member</div>
                                    }
                                </div>
                            }
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Admin
