import { Form } from 'react-router-dom'

function LoginForm() {
  return (
    <section className='w-1/2 p-4'>
      {/* Form */}
      <Form
        method='post'
        // action={action}
        className='space-y-4 py-2'
      >
        <div className='field__wrapper'>
          <label>Email</label>
          <input 
            type="text"
            name='email'
            defaultValue='' 
            className='field__text'
          />
        </div>
        <div className='field__wrapper'>
          <label>Password</label>
          <input 
            type="password"
            name='email'
            defaultValue='' 
            className='field__text'
          />
        </div>

        <div className='field__wrapper'>
          <button
            type='submit'
            className='btn__primary bg-pink font-bold'
          >
            Login
          </button>
        </div>

      </Form>
    </section>
  )
}

export default LoginForm
