import { addFieldprop } from "../../data"

export default function AddField({indx}:addFieldprop){
    console.log(indx)
    return (
      <div>
        <label htmlFor={"field_"+indx}>Field {indx}</label>
        <input type="text" id={"field_"+indx} name={"field_"+indx}/>
        <label htmlFor={"type_"+indx}>Type</label>
        <select id={"type_"+indx} name={"type_"+indx}>
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="num">Number</option>
            <option value="email">Email</option>
            <option value="file">File</option>
            <option value="image">Image</option>
            <option value="url">Url</option>
        </select>
      </div>
    )
  }