import userDb from "../model/signUpSchema.js";



export const DataAdd = async (req, res) => {
    const { title, content, id,complete } = req.body;
    try {
        const ResponseUpdate = await userDb.findOneAndUpdate({ _id: id }, {
            $push: {
                list: {
                    title: title,
                    content: content,
                    complete:complete
                }
            }
        }, { new: true }
        )
        if (ResponseUpdate) {
            res.status(201).json({ message: "Data Update succesfully", ResponseUpdate, status: 201 })
        } else {
            res.status(404).json({ error: "Unsuccesful Update Data", status: 404 })
        }

    } catch (error) {
        res.status(422).json({ error: "Unsuccesful Update Data", status: 422 })
    }
}



// data delete/remove from notes list 
export const DeleteItems = async (req, res) => {
    const { listId, id, } = req.body;
    try {
      const delteItems = await userDb.findByIdAndUpdate({ _id: id }, {
        $pull: {
          list: {
            _id: listId
          }
        }
      }, { new: true }
      )
      if (delteItems) {
        res.status(201).json({ message: "data delete succesfully", status: 201, delteItems })
      } else {
        res.status(404).json({ errir: "data unsuccesfully delete", status: 404 })
      }
    } catch (error) {
      res.status(422).json({ errir: "data unsuccesfully delete", status: 422 })
    }
  
  }
  