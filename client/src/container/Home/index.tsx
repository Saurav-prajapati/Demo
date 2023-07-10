import react, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./index.scss"
import AddTodoList from "./AddTodoList";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState()
  const [list, setList] = useState([])
  const [editToggle, setEditToggle] = useState(false)
  const [currentPages, setCurrentPages] = useState(1);

  // pagination 
  const recordPages = 5;
  const lastIndex = currentPages * recordPages
  const firstIndex = lastIndex - recordPages
  const records = list.slice(firstIndex, lastIndex)
  const nPages = Math.ceil(list.length / recordPages)
  const numbers = [...Array(nPages + 1).keys()].slice(1)
  console.log(records);


  function prePage() {
    if (currentPages !== 1) {
      setCurrentPages(currentPages - 1)
    }
  }

  function changeCPages(id: any) {
    setCurrentPages(id)
  }

  function nextPage() {
    if (currentPages !== nPages) {
      setCurrentPages(currentPages + 1)
    }
  }


  // add list 
  const addList = () => {
    setToggle(!toggle)
  }


  // deleteitems 
  const deleteData = async (listid: any) => {
    const listId = listid._id;
    if (listId) {
      const res = await fetch("/api/deleteitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          listId,id
        })
      })
      const response=await res.json()
      if(response.status===201){
        setList(response.delteItems.list);
                
      }
    }
  }


  // update items
  const updateData = (id: any) => {
    setEditToggle(!editToggle)
  }



  const userisValid = async () => {
    const res = await fetch("/api/userisvalid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const response = await res.json();
    console.log(response.username);

    if (!response.username) {
      navigate("/login")
    } else {
      navigate("/")
      setId(response._id);
      setList(response.list)
      window.localStorage.setItem("user_id", response._id)
    }
  }


  useEffect(() => {
    // eslint-disable-next-line
    userisValid();
  }, [])


  return (
    <>
      <div className="homePage">
        <div className="upperSection">
          <div className="container">
            <div className="title"> Task Sheet </div>
            <div className="button" onClick={() => { addList() }}>Add</div>
          </div>
        </div>
        <div className="bottomSection">
          <div className="header">
            <div className="point">
              <div className="point_titles">Title</div>
              <div className="point_contents">Description</div>
            </div>
          </div>
          <div className="containers">
            {react.Children.toArray(
              records.map((elem: any) => {
                return (
                  <div className="point">
                    <div className="point__title">{elem.title}</div>
                    <div className="point__content">{elem.content}</div>
                    {
                      <div className="itemPoint">
                        <div className="update" onClick={() => { updateData(elem) }}><AiOutlineEdit /></div>
                        <div className="update" onClick={() => { deleteData(elem) }} ><AiFillDelete /></div>
                      </div>
                    }
                  </div>
                )
              })
            )
            }
          </div>
        </div>
        <div className="paginations">
          <ul className="pagnitaonsss">
            <li className="page-items">
              <a href='##' className='page-link' onClick={prePage}>Prev</a>
            </li>
            {react.Children.toArray(
              numbers.map((n, i) => {
                return (
                  <li className={`page-items ${currentPages === n ? `active` : ""}`} key={i}>
                    <a href='##' className='page-items' onClick={() => changeCPages(n)}>{n}</a>
                  </li>
                )
              })
            )
            }
            <li className="page-items">
              <a href='##' className='page-link' onClick={nextPage}>Next</a>
            </li>
          </ul>
        </div>
      </div>
      {toggle ? <AddTodoList addList={addList} id={id} setList={setList} /> : ""}
    </>
  )
}

export default Home