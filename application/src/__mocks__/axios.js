const mockResponse = {
  data: {
    results: [
      {
        id: "1",
        first_name: "Lola",
        last_name: "Mom",
        email: "lola@email.com",
        phone: "1234567",
        address_1: "123 Main Street",
        address_2: "Apt 2",
        state: "CA",
        city: "IDK",
        zip_code: "78942"
      }
    ]
  },
  status: 200 // Include the status property in the mock response object
};

export default {
  post: jest.fn().mockResolvedValue(mockResponse)
};
