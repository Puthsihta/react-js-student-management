import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
  const { id, type } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState<any>('')
  const [age, setAge] = useState<any>('')

  useEffect(() => {
    if (type !== 'creat') {
      getData()
    }
  }, [type])

  const getData = () => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setName(result.name)
        setAge(result.age)
      })
      .catch((error) => console.log('error', error))
  }

  const creatUser = () => {
    if (name.trim().length === 0) {
      alert('Please Enter Name !!')
      return
    }
    if (age.trim().length === 0) {
      alert('Please Enter Age !!')
      return
    }
    if (Number(age) < 18 || Number(age) > 65) {
      alert('Age must be between 18 and 65!!')
      return
    }
    if (isNaN(age)) {
      alert('Please Enter Number, not string')
      return
    }
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      name: name,
      age: age,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    }

    fetch('http://localhost:3000/user', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('Result : ', result)
        navigate(-1)
      })
      .catch((error) => console.log('error', error))
  }

  const updateUser = () => {
    if (name.trim().length === 0) {
      alert('Please Enter Name !!')
      return
    }
    if (Number(age) < 18 || Number(age) > 65) {
      alert('Age must be between 18 and 65!!')
      return
    }
    if (isNaN(age)) {
      alert('Please Enter Number, not string')
      return
    }
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      name: name,
      age: age,
    })

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    }

    fetch(`http://localhost:3000/user/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setName(result.name)
        setAge(result.age)
        navigate(-1)
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <div className="w-full h-auto min-h-screen m-3 elf-center">
      <div>
        <input
          value={name}
          disabled={type === 'view'}
          type="text"
          placeholder="please input student name ... "
          onChange={(txt) => {
            setName(txt.target.value)
          }}
          className="w-[96%] h-[3rem] border m-3 p-3 rounded"
        />
      </div>
      <div>
        <input
          value={age}
          disabled={type === 'view'}
          type="text"
          placeholder="please input student age ... "
          onChange={(txt) => {
            setAge(txt.target.value)
          }}
          className="w-[96%] h-[3rem] border m-3 p-3 rounded"
        />
      </div>
      {type !== 'view' && (
        <div>
          <button
            onClick={type === 'creat' ? creatUser : updateUser}
            className="w-[96%] h-[3rem] border m-3 p-3 rounded bg-white hover:bg-black text-black hover:text-white"
          >
            {type === 'creat' ? 'Creat' : 'Update'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Detail
