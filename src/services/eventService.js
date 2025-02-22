const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/baadir`;

const index = async () => {
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const companyIndex = async () => {
    try {
      const res = await fetch(`${BASE_URL}/companyEvents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const create = async (eventFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  // const deleteEvent = async (id) => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     return res.json();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  export { 
    index,
    create,
    // deleteEvent,
    companyIndex,
  };
  