var BASE_URL ="https://thundafund.com/";
export    const get_payments = (project_id:any) => {
  return fetch(
    BASE_URL+"api/v2/project/funding/details/"+project_id,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json())
};

export    const get_exhangeRates = () => {
  return fetch(
    BASE_URL+"api/detect_country",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => res.json())
};

export    const submit_bucking = (data:any) => {
  return fetch(
    BASE_URL+"api/v2/payments/backers/checkout",
    {
      method: "POST",
      body: data
    }
  ).then((res) => res.json())
};



