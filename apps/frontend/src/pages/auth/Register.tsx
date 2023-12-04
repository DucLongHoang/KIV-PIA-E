import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LINKS } from "../../constants/Links"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"

export const Register = () => {
  const [orion, setOrion] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log("====================================")
    console.log("Registered")
    console.log("====================================")
    navigate(LINKS.home)
  }

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orion">Orion login</label>
          <input onChange={undefined} id="orion" type="text" className="form-control" placeholder="orion-login" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={undefined} id="password" type="password" className="form-control" placeholder="******" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </AppLayout>
  )
}
