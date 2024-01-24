import { request } from "graphql-request";
import { initializeDB } from "../../app";
import { AppDataSource } from "../../config/dbConnection";

const baseUrl = "http://localhost:3005/graphql";
let token: string;

//hook that runs before all test cases in this file
beforeAll(async () => {
  await initializeDB;
});

//hook that runs after all test cases in this file
afterAll(async () => {
  await AppDataSource.query("DROP TABLE IF EXISTS subscription");
  await AppDataSource.query("DROP TABLE IF EXISTS channel");
  await AppDataSource.query("DROP TABLE IF EXISTS plan");
  await AppDataSource.query("DROP TABLE IF EXISTS user");
  AppDataSource.close();
});

describe("Registration API", () => {
  const mutation = `mutation{
        createUser(username:"raju",firstname:"raju",lastname:"kumar",email:"raju@test.com",password:"raju",mobile:"8567398729",role:0){
            id
            username
            email
        }
    }`;
  test("should register if user doesn't exists", async () => {
    const response: any = await request(baseUrl, mutation);
    expect(response.createUser.id).toEqual("1");
    expect(response.createUser.username).toEqual("raju");
    expect(response.createUser.email).toEqual("raju@test.com");
  });

  test("return null if user already exist", async () => {
    const response: any = await request(baseUrl, mutation);
    expect(response.createUser).toEqual(null);
  });
});

describe("signin user mutation", () => {
  test("should user login if user exists and return access token", async () => {
    const mutation = `
                     mutation{
                      loginUser(email:"raju@test.com", password:"raju")
                    }
                  `;
    const response: any = await request(baseUrl, mutation);
    token = response.loginUser;
    console.log(token);

    expect(response.loginUser).not.toEqual("");
    expect(response.loginUser.length).toBeGreaterThan(166);
  });
  test("should return User Not Found if user does not exist ", async () => {
    const mutation = `
                     mutation{
                      loginUser(email:"raju1@test.com", password:"raju")
                    }
                  `;
    const response: any = await request(baseUrl, mutation);
    expect(response.loginUser).toEqual("User Not Found");
  });
  test("should return unauthorize if password is incorrect ", async () => {
    let mutation = `
                   mutation{
                    loginUser(email:"raju@test.com", password:"12345hsd8976")
                  }
                `;
    const response: any = await request(baseUrl, mutation);
    expect(response.loginUser).toEqual("unauthorize");
  });
});

describe("Testing graphql queries for user", () => {
  describe("get single user", () => {
    const query = `
                  query {
                    getSingleUser(email: "raju@test.com") {
                      id
                      email
                      username
                    }
                  }
                `;
    test("should get a single user if user logged in", async () => {
      const response: any = await request(baseUrl, query);
      expect(response.getSingleUser.id).toEqual("1");
      expect(response.getSingleUser.username).toEqual("raju");
      expect(response.getSingleUser.email).toEqual("raju@test.com");
    });
  });
});

describe("Testing for DELETE user", () => {
  describe("DELETE single user", () => {
    test("should delete a user by Id", async () => {
      let mutation = `
                  mutation {
                    deleteUser(id: 1) {
                      username
                    }
                  }
                `;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response: any = await request(baseUrl, mutation, { headers });

      expect(response.deleteUser).toEqual(null);
    });
  });
});

// mutation and query for channel

describe("Testing for ADD channel", () => {
  describe("Add channel", () => {
    test("should add a channel", async () => {
      let mutation = `
                  mutation {
                    createChannel(category:"sports",name:"start sport111",planId:2) {
                      id
                    }
                  }
                `;
      const response: any = await request(baseUrl, mutation);

      expect(response.createChannel.id).toEqual("1");
      
    });
  });

  describe("DELETE single channel", () => {
    test("should delete a channel by Id", async () => {
      let mutation = `
                  mutation {
                    deleteChannel(id: "1") {
                      name
                      planId
                    }
                  }
                `;
      const response: any = await request(baseUrl, mutation);

      expect(response.deleteChannel).toEqual(null);
    });
  });
});

// mutation and query for plan
describe("Testing for plans", () => {
  describe("create plan", () => {
    const mutation = `mutation{
      addPlan(category:"sports",price:"Rs 9999",duration:"1 Year"){
          id
          category
          duration
        }
      }`;
    test("should add a plan", async () => {
      const response: any = await request(baseUrl, mutation);
      expect(response.addPlan.id).toEqual("1");
      expect(response.addPlan.category).toEqual("sports");
      expect(response.addPlan.duration).toEqual("1 Year");
    });
  });
  
  describe("DELETE plan", () => {
    const mutation = `mutation{
      deletePlan(id:"1"){
          id
          category
          duration
        }
      }`;

    test("should delete a plan by id", async () => {
      const response: any = await request(baseUrl, mutation);
      expect(response.deletePlan).toEqual(null);
    });
  });
});
