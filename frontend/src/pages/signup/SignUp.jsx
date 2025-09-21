import React from 'react'
import GenderCheckBox from './GenderCheckBox.jsx'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'

const SignUp = () => {

  const [inputs, setInputs] = React.useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })

  const {loading, signup} = useSignup()


  const handleSubmit = async(e) => {
    e.preventDefault() // to stop the page from refreshing
    await signup(inputs)
  }

  const handleGenderChange = (gender) => {
    setInputs({ ...inputs, gender })
  }
    

  return (
    <>
      <div className=' flex flex-col justify-center items-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-300'>

          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up <span className='text-blue-500'>ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <input type="text" placeholder="Enter Full Name" className="input input-bordered w-full max-w-xs"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
              </label>
              <input type="text" placeholder="Enter Username" className="input input-bordered w-full max-w-xs"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input type="password" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" 
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <input type="password" placeholder="Enter Password Again" className="input input-bordered w-full max-w-xs"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>

            {/* Gender Checkbox */}
            <GenderCheckBox handleGenderChange={handleGenderChange} selectedGender={inputs.gender} />

            <Link to={'/login'}  className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              Already have an account?
            </Link>

            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
          </form>

        </div>

      </div>
    </>
  )
}

export default SignUp
