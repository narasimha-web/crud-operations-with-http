import {useState,useEffect}from 'react';
import './App.css'
import Tablecontent from './TableContent';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const App = () => {
const [employs,setEmployes] = useState([]);
const [ show , setShow] = useState(false);
const [ newData,setNewData] = useState({
  first_name:"",
  last_name:"",
  email:"",
  avatar:""
});
const [ action,setAction] = useState();
const [ showMe,setShowme] = useState(false)

useEffect(()=>{
const getEmploys = async ()=>{
  try {
    const response = await fetch(
    'https://reqres.in/api/users?page=1'
    );
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    let postsData = await response.json();
    setEmployes(postsData.data)
   // setData(postsData);
    //setError(null);
  } catch (err) {
    // setError(err.message);
    // setData(null);
   } 
};
getEmploys();
},[]);

useEffect(()=>{
if(action){
  setShow(true)
}else{
  setShow(false)
  setNewData({
    first_name:"",
    last_name:"",
    email:"",
    avatar:""
  })
}
},[action])

// add employ 
const addEmploy = () =>{
  setAction("Add")
};
const handleClose = () =>{
setAction(undefined)
};
const takingInputText = (event) =>{
  const newEmploData = {...newData} // JSON.parse(JSON.stringify(newData));
  newEmploData[event.target.name] = event.target.value
setNewData(newEmploData);
};
const addNewEmploy =  async () =>{
  const saveEmploy = await fetch("https://reqres.in/api/users",{
    method :"POST", 
    body : JSON.stringify(newData)
  });
  if(saveEmploy.ok){
    const result = await saveEmploy.json()
    console.log(result)
  }else{
    console.error("error")
  }
  
const newemploy = employs;
newemploy.push(newData);
setEmployes(newemploy)
handleClose()
};
/// closing the addemploy data

//editemploy start
const editNewEmploy = async (editData) =>{

  try {
  const getEmployData = await fetch(`https://reqres.in/api/users/${editData.id}`);
  if (!getEmployData.ok) {
    throw new Error(`HTTP error: Status ${getEmployData.status}`);
  }
  const formatData = await getEmployData.json();
  setNewData(formatData.data);
  setAction("edit");
  } catch(error) {
    console.log(error);
  }

};
const editEmploy = () =>{
  const findRecord = employs.findIndex((num)=> num.email === newData.email);
  if(findRecord !== -1){
    employs[findRecord]= newData;
setEmployes(employs);
handleClose();
  }
};
// editemploy cose

// delete employ
const handleClos = () =>{
  setShowme(false)
}

const deleteItem = async (itemDelete) => {
  const responseData = await fetch(`https://reqres.in/api/users/${itemDelete.id}`, {
    method: "DELETE",
    //body: JSON.stringify(itemDelete)
  });
  if (responseData.ok) {
    //const result = await responseData.json();
    //console.log(result);
    console.log('Item deleted successfully');
  } else {
    console.error('Error occurred while deleting the item');
  }

  setShowme(true);
  setNewData(itemDelete);
};


const deleteEmploy = () =>{
  const deletNo = employs.findIndex(item => item.email === newData.email);
if(deletNo !== -1){
  employs.splice(deletNo,1);
  setShowme(false);
}
}
return(
  <div>
    <Tablecontent data={employs} addEmp={addEmploy} editEmp={editNewEmploy} deleteEmp={deleteItem}/>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{action === "edit" ? "Edit Employe" : "Add Employ"}</Modal.Title>

        </Modal.Header>
        <Modal.Body>
       <Form>
       <Form.Group className='mb-3' in>
        <Form.Label>firstName</Form.Label>
        <Form.Control type='text' name='first_name' value={newData.first_name}  onChange={takingInputText}></Form.Control>
       </Form.Group>
       <Form.Group className='mb-3'>
        <Form.Label>lastName</Form.Label>
        <Form.Control type='text'  name='last_name' value={newData.last_name} onChange={takingInputText} ></Form.Control>
       </Form.Group>
       <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type = "email"name='email' value={newData.email}  onChange={takingInputText}/>
       </Form.Group>
       <Form.Group>
        <Form.Label>Avatar</Form.Label>
        <Form.Control  name='avatar' value={newData.avatar} onChange={takingInputText}></Form.Control>
       </Form.Group>
       </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={action ==="edit" ? editEmploy : addNewEmploy} > {action === "edit" ? "Update"  : "Add"}</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showMe}
        onHide={handleClos}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Are You Sure You Want To Delete this record ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClos}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteEmploy}>Delete</Button>
        </Modal.Footer>
      </Modal>

  </div>
)
};

// table content
export default App