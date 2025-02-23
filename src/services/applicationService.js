const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/baadir`;

const index = async () => {
    try {
        const res = await fetch(`${BASE_URL}/applications`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (eventId) => {
    try {
        const res = await fetch(`${BASE_URL}/events/${eventId}/applications`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    } catch (error) {
        console.log(error.message);
    }
};

const applicationIndex = async (eventId) => {
    try {
        const res = await fetch(`${BASE_URL}/events/${eventId}/applications`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteApplication = async (applicationId) => {
    try {
      const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
}

export {
    index,
    create,
    applicationIndex,
    deleteApplication
};