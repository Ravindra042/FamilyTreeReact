import React, { Component } from 'react'
import axios from 'axios';
import { config } from './Constants';

class MemberForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            member : {"gender":"MALE"},
            fathers : [],
            mothers : [],
            action : "CREATE",
            cancelAction : "CLEAR",
            backendUrl : config.url.API_URL
        }
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value,
        });
        this.state.member[name] = value;
    }

    parentChangeHandler = (event) => {
        let name = event.target.name;
        this.setState({});
        if("NA" === event.target.value){
            this.state.member[name] = null;
        }else{
            this.state.member[name] ={"id":event.target.value}
        }
        
    }

    componentDidMount() {
        this.fetchFathers();
        this.fetchMothers();
        let id = this.props.match.params.id;
        if(id){
            console.log("this is update request");
            this.fetchMemberDetails();
        }
      };

      fetchMemberDetails () {
        axios.get(`${this.state.backendUrl}member/${this.props.match.params.id}`)
          .then(response => {
            this.setState({
                member:response.data,
                action : "UPDATE",
                cancelAction : "CANCEL"
            })
          }).catch(error =>{
              console.log(error);
          });
      }

      fetchFathers () {
        axios.get(`${this.state.backendUrl}member/parents?married=true&gender=MALE`)
          .then(response => {
            this.setState({fathers:response.data})
          }).catch(error =>{
              console.log(error);
          });
      }

      fetchMothers () {
        axios.get(`${this.state.backendUrl}member/parents?married=true&gender=FEMALE`)
          .then(response => {
            this.setState({mothers:response.data})
          }).catch(error =>{
              console.log(error);
          });
      }

    createNew = () => {
        const { member } = this.state
        let id = this.props.match.params.id;
        if(id){
            console.log("updating");
            axios.put(`${this.state.backendUrl}member/${id}`,  member )
            .then(res => {
                this.props.history.push(`/familytree/members/${id}`);
            }).catch(error =>{
                console.log(error);
            });
        }else{
            console.log("creating");
            axios.post(`${this.state.backendUrl}member`,  member )
            .then(res => {
                this.props.history.push(`/familytree/members/${res.data.id}`);
            }).catch(error =>{
                console.log(error);
            });
        }
    }

    cancelAction = () => {
        let id = this.props.match.params.id;
        if(id){
            this.props.history.push(`/familytree/members/${id}`);
        }else{
            this.setState({member : {"gender":"MALE"}})
        }
    }
    
    render() {
        return (
            <div className="page-style">
                <form>
                    <h2 style={{paddingLeft: 0.5 + 'em'}}>{this.state.action} Member</h2>
                    <input type="text" name="firstName" value={this.state.member.firstName} onChange={this.myChangeHandler}  placeholder='First Name'/>
                    <input type="text" name="nickName" value={this.state.member.nickName} onChange={this.myChangeHandler}  placeholder='Nick Name'/>
                    <input type="text" name="lastName" value={this.state.member.lastName} onChange={this.myChangeHandler}  placeholder='Last Name'/>
                    <div><textarea style={{height: 2 + 'em'}} name="about" className="form-entity" value={this.state.member.about} onChange={this.myChangeHandler} placeholder='about'/></div>
                    <select className="form-entity" name="gender" value={this.state.member.gender} onChange={this.myChangeHandler}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    {/* Married, Anniversary Date, lifePartner */}
                    <div>
                        {/* Married */}
                        <label style={{padding: 1 + 'em'}}>Married  : 
                            <input name="married" type="checkbox" defaultChecked={this.state.member.married} value={this.state.member.married} onChange={this.myChangeHandler} />
                        </label>
                        {/* Anniversary Date */}
                        {this.state.member.married ? 
                            <span><label>Anniversary Date</label>
                                <input style={{width: 17 + 'em'}} type="date" className="form-entity" value={this.state.member.weddingAnniversaryDate} name="weddingAnniversaryDate" onChange={this.myChangeHandler}></input>
                            </span> : ''
                        }
                        {/* Life Partner */}
                        {this.state.member.married ? 
                            <div>
                                <label style={{padding: 1 + 'em'}}>Life Partner :</label>
                                <select style={{width: 24 + 'em'}} className="form-entity" name="lifePartner" 
                                    value={this.state.member.lifePartner ? this.state.member.lifePartner.id : ''} 
                                    onChange={this.parentChangeHandler}>
                                        <option  value='NA'>Not Defined</option>
                                        {this.state.member.gender==='MALE' ? this.state.mothers.map(lifePartner => (
                                            <option key={lifePartner.id} value={lifePartner.id}>{lifePartner.firstName} {lifePartner.lastName}</option>
                                        )) :
                                        this.state.fathers.map(lifePartner => (
                                            <option key={lifePartner.id} value={lifePartner.id}>{lifePartner.firstName} {lifePartner.lastName}</option>  
                                        ))}
                                </select>
                            </div> : '' 
                        }
                    </div>
                    {/* Birth Day */}
                    <div>
                        <label style={{padding: 1 + 'em'}}>Birth Date</label>
                        <input style={{width: 26 + 'em'}} type="date" className="form-entity" value={this.state.member.dateOfBirth} name="dateOfBirth" onChange={this.myChangeHandler}></input>
                    </div>
                    {/* Father */}
                    <div><label style={{padding: 1 + 'em'}}>Pappa</label>
                        <select style={{width: 28 + 'em'}} className="form-entity" name="father" 
                                value={this.state.member.father ? this.state.member.father.id : ''} 
                                onChange={this.parentChangeHandler}>
                            <option  value='NA'>Not Defined</option>
                            {this.state.fathers.map(father => (
                                <option key={father.id} value={father.id}>{father.firstName} {father.lastName}</option>
                            ))}
                        </select>
                    </div>
                    {/* Mother */}
                    <div><label style={{padding: 1 + 'em'}}>Mamma</label>
                        <select style={{width: 28 + 'em'}} className="form-entity" name="mother" 
                            value={this.state.member.mother ? this.state.member.mother.id : ''} 
                            onChange={this.parentChangeHandler}>
                                <option  value='NA'>Not Defined</option>
                                {this.state.mothers.map(mother => (
                                    <option key={mother.id} value={mother.id}>{mother.firstName} {mother.lastName}</option>
                                ))}
                        </select>
                    </div>
                    <div style={{padding: 1 + 'em'}}>
                        <input style={{width : 21 + 'rem'}} type="button" value={this.state.action} onClick={this.createNew}></input>
                        <input style={{width : 21 + 'rem'}} type="button" value={this.state.cancelAction} onClick={this.cancelAction}></input>
                    </div>
                </form>
                {/* <div><pre>{JSON.stringify(this.state.member, null, 2) }</pre></div> */}
            </div>
        )
    }
}

export default MemberForm;
