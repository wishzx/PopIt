import * as user from '../user';

// use a local database for testing
// delete db before every test , every test must be stateless and not reliant to another test
describe("user handler", () => {
    it("should create a new user",async () => {
        const req = {body: {username: 'hello', password: 'hi'}}
        const res = {json({token}) {
            expect(token).toBeTruthy() //spy
        }}
        
        const newUser = await user.createNewUser(req,res,()=>{})

    });
});
