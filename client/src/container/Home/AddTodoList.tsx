import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const AddTodoList = ({ addList, id ,setList}: any) => {
  const [data, setdata] = useState({
    title: "", content: "",complete:"false"
  })
  console.log(data);
  

  const changeHandler = (e: any) => {
    var name = e.target.name;
    var value = e.target.value;
    setdata({ ...data, [name]: value })
  }


  const sumbitData = async (e: any) => {
    e.preventDefault();
    const { title, content,complete } = data;
    if (!title || !content) {
      alert("plz all input")
    } else {
      const res = await fetch("/api/dataadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, content, id,complete
        })
      })
      const response=await res.json()
      if(response.status===201){
        setList(response.ResponseUpdate.list); 
        setdata({title: "", content: "",complete:""})
      }else{
        alert("something went wrong")
      }
    }
  }


  const getItemId = () => {
    // const id:any=window.localStorage.getItem("user_id")
    // setId(id)
  }

  const closeData = () => {
    addList()
  }


  useEffect(() => {
    getItemId()
  }, [])

  return (
    <div className="addTodo">
      <div className="mainAddTodo">
        <div className="cross" onClick={addList} ><AiOutlineClose /></div>
        <div className="head">Add Task</div>
        <form >
          <div className="point">
            <label >Enter Your Title</label>
            <input type="text" id='title' name='title' className='title' value={data.title} onChange={(e) => { changeHandler(e) }} />
          </div>
          <div className="point">
            <label >Enter Your Content</label>
            <textarea name="content" id="textarea" cols={30} rows={7} value={data.content} onChange={(e) => { changeHandler(e) }} />
          </div>
          <div className="checkox">
            <input type="checkbox" name="complete" id="complete"  value={data.complete} onChange={(e) => { changeHandler(e) }} disabled/>
          </div>
          <button onClick={(e) => { sumbitData(e) }}>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddTodoList