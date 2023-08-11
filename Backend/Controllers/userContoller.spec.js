import mssql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerUser } from "./userController";

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("Test for user controllers",()=>{
    describe("Registering a User", () => {
        it("should Register a User", async () => {
          jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
          const mockUser = {
            firstName: "David",
            lastName:"Munyiri",
            jituEmail: "david.munyiri@thejitu.com", 
            userCohort: "1",
            password: "Mahu12#34",
          };
          const req = {
            body: mockUser,
          };
    
          jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
              rowsAffected: 1,
            }),
          });
          await registerUser(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            message: "User Registered as success",
          });
        });
    
        it("should Not Register a User", async () => {
          jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("yutruruyy");
          const mockUser = {
            firstName: "lugybfyt",
            lastName:"uygtrtg",
            jituEmail: "david.munyiri@thejitu.com",
            userCohort: "1",
            password: "Mahu12#34",
          };
          const req = {
            body: mockUser,
          };
    
          jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
              rowsAffected: 0,
            }),
          });
          await registerUser(req, res);
    
          expect(res.json).toHaveBeenCalledWith({
            message: "Error Registering you",
          });
          expect(res.status).toHaveBeenCalledWith(400);
        });
      });

  })