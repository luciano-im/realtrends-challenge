import React, { useState } from 'react';

function UserForm(props) {
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState(false);

  const handleFormData = (event) => {
    setUser(event.target.value);
  };

  const processForm = (event) => {
    event.preventDefault();
    if (user === '' || user.length > 20) {
      setErrors(true);
    } else {
      props.handleUser(user);
      setErrors(false);
      document.getElementById('user-form').reset();
    }
  };

  return (
    <section className="user-form">
      <form id="user-form">
        <div>
          <input
            type="text"
            name="user"
            onChange={handleFormData}
            placeholder="Usuario"
          ></input>
          <input type="submit" value="Ingresar" onClick={processForm}></input>
        </div>
        <p className={`error ${errors ? 'show' : ''}`}>
          {user.length > 20
            ? 'El nombre de usuario es muy largo'
            : 'El usuario no puede estar vacío'}
        </p>
      </form>
    </section>
  );
}

export default UserForm;
