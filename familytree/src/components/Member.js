import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faBirthdayCake, faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons'
import Address from './Address';


function Member(props) {
    const {member} = props;
   
    return (
        <div  className="page-style">
            <div className="basic">
                <div>
                    <h2>
                        <span>
                            <i>{ member.gender==='MALE' ?  <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}</i>  
                            { member.firstName } { member.lastName }  
                        </span>
                        <span>
                            { member.nickName !== member.firstName && <span> ({member.nickName}) </span>}
                        </span>
                        <Link to={`/familytree/members/update/${member.id}`}> <FontAwesomeIcon icon={faEdit} /></Link>
                    </h2>
                </div>
                { member.dateOfBirth && 
                    <div>
                        <i><FontAwesomeIcon icon={faBirthdayCake} /></i> <span>{ member.dateOfBirth } - {member.age}</span>
                    </div>
                }
                { member.about && 
                    <div>
                        <i><FontAwesomeIcon icon={faInfoCircle} /></i> 
                        <span> { member.about }</span>
                    </div>
                }
            </div>
            <div className="address">
                <Address address={member.address} memberId = {member.id}></Address>
            </div>
            <hr/>
            <div><h3><span className="badge badge-secondary">PARENTS</span></h3></div>
            <table>
            { member.father && member.mother ? <TRHeader /> : 'Not defined'}
            <tbody>
            { member.father ?
                <tr  style={{cursor:'pointer'}} onClick={()=> props.history.push(`/familytree/members/${member.father.id}`)}>
                    <td> 
                        <i><FontAwesomeIcon icon={faMale} /></i>
                        { member.father.nickName }
                    </td>
                    <td>{ member.father.firstName }</td>
                    <td>{ member.father.lastName }</td>
                    <td>{ member.father.dateOfBirth } - {member.father.age}</td>
                </tr> : ''
            }
            { member.mother ? 
                <tr  style={{cursor:'pointer'}} onClick={()=> props.history.push(`/familytree/members/${member.mother.id}`)}>
                    <td> 
                        <i><FontAwesomeIcon icon={faFemale} /></i>
                        { member.mother.nickName }
                    </td>
                    <td>{ member.mother.firstName }</td>
                    <td>{ member.mother.lastName }</td>
                    <td>{ member.mother.dateOfBirth } - {member.mother.age}</td>
                </tr> : ''
            }
            </tbody>
            </table>
            <hr/>
            { member.lifePartner ?
                <div>
                <div><h3><span className="badge badge-secondary">LIFE PARTNER</span></h3></div>
                <table>
                <TRHeader />
                <tbody>
                    <tr  style={{cursor:'pointer'}} onClick={()=> props.history.push(`/familytree/members/${member.lifePartner.id}`)}>
                        <td> 
                            <i>{ member.lifePartner.gender==='MALE' ?  <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}</i>
                            <span>{ member.lifePartner.nickName }</span>
                        </td>
                        <td>{ member.lifePartner.firstName }</td>
                        <td>{ member.lifePartner.lastName }</td>
                        <td>{ member.lifePartner.dateOfBirth } - {member.lifePartner.age}</td>
                    </tr>
                </tbody>
                </table> </div>: ''
            }
            { member.children ?
            <div>
            <div><h3><span className="badge badge-secondary">CHILDREN</span></h3></div>
            <table>
                <TRHeader />
                <tbody>
                    {member.children.map(child => (
                        <tr key={child.id}  style={{cursor:'pointer'}} onClick={()=> props.history.push(`/familytree/members/${child.id}`)}>
                            <td> 
                                <i>{ child.gender==='MALE' ?  <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}</i>
                                <span>{ child.nickName }</span>
                            </td>
                            <td>{ child.firstName }</td>
                            <td>{ child.lastName }</td>
                            <td>{ child.dateOfBirth } - {child.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table> </div>: ''
            }
        </div>
    )
}

/* ############################ */
/* ##### TR HEADER ##### */
/* ############################ */

const TRHeader = () => (
    <thead>
        <tr>
            <th scope="col">Nick Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Birth Day</th>
        </tr>
    </thead>
  )


export default withRouter(Member);

