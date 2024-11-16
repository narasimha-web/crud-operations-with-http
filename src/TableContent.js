import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Tablecontent = ({ data ,addEmp,editEmp,deleteEmp}) => {
    return (
      <section>
 

   <div className='tabledimension'>
       <div className='buttondimension'>
       <Row>
        <Col><h3 className='text'>JsonData</h3></Col>
        <Col>
       <Row>
        <Col><Button className='firstButton' onClick={addEmp}>AddEmploy</Button></Col>
       <Col>
        <Button className='secondbutton'>DeleteEmploy</Button>
        </Col>
       </Row>
        </Col>
      
       </Row>
       </div>
        <Table bordered hover >
            <thead>
              <tr>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr>
                  <td><img src={user.avatar} alt={`${user.first_name}`} width={'50'} ></img></td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.avatar}</td> 
                  <td>
                  <td>{}
              <a href='#' onClick={()=>{editEmp(user)}}><i class="fa-solid fa-pencil pen"></i></a>  
              <a href='#' onClick={()=>{deleteEmp(user)}}> <i class="fa-solid fa-trash trash"></i></a>
            </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
 
    
      </section>
    );
  };

  export default Tablecontent;