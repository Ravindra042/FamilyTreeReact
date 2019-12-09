import React from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faEdit } from '@fortawesome/free-solid-svg-icons'

function MemberRow(props) {
    const { member } = props;

    return (
        <tr style={{cursor:'pointer'}} onClick={()=> props.history.push(`/familytree/members/${member.id}`)}>
            <td> 
                <i>{ member.gender==='MALE' ?  <FontAwesomeIcon icon={faMale} /> : <FontAwesomeIcon icon={faFemale} />}</i>
                <span>{member.nickName}</span>
            </td>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.dateOfBirth ? member.dateOfBirth : 'NA'}</td>
            <td><Link to={`/familytree/members/update/${member.id}`}> <FontAwesomeIcon icon={faEdit} /></Link></td>
        </tr>
    )
}

export default withRouter(MemberRow);