/*
In software development, staging refers to an environment that is used to test and validate a software application or service before it is deployed to production. The staging environment is typically a replica of the production environment, but it is isolated and separate from the production environment.
Staging is an important part of the software development lifecycle because it allows developers, testers, and quality assurance teams to test new features, bug fixes, and other changes in an environment that closely resembles production, without risking the stability and reliability of the live application.
In a typical staging environment, the application is deployed on servers that are similar in configuration to the production servers. The staging environment may also have a separate database or other infrastructure components to avoid interfering with the production environment.
Once the application has been tested and validated in the staging environment, it can be deployed to production with a higher degree of confidence that it will work as intended and not cause any issues for end-users.
Staging is a critical step in the software development process, as it helps to ensure that the application is stable, reliable, and functioning properly before it is released to the public.
*/

export default {
    port : process.env.PORT
    
}