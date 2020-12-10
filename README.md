# EZ Technical Test

**Instalation**

1. Only a docker installed is necessary


**Execute**

1. For only one execution step, execute the shell script file `execute.sh`
2. Or in separate steps:
    1. Create network `docker network create app-network`
    2. Execute `docker-compose build`
    3. Execute `docker-compose up`

**About the code**

For this challenge, i have crated 3 distincts folders:

* backend
* frontend
* wiremock

All of them is orchestrated by docker, each folder contains a Dockerfile, with instructions for build.
The build and execution is managed by docker-compose.

**Backend**

Built using Java 8, as primary tech.

And others techs used on development:

1. Spring, Spring Boot, Spring Data
2. Lombok
3. Test With Spring packages
4. H2 Database
5. Maven

The porpuse of backend is to be the main connection between wiremock, and frontend.
All requests made by frontend first pass by backend e after request is made on wiremock.
All baskets persisted is save on database, all baskets saved can be listed too.


**Frontend**

Built using React and Bootstrap.

Is a simple system, defined by pages an functions describe below:
1. **Home**, list all available products to be buy, all products can be selected on this page.
2. **List**, page with list of all baskets/shopping already made by the user. Can be access by option 'List' on navbar, or after finish the shopping.
3. **Navbar**, is the component who show itens already choosen on the cart, and redirect to the cart page, if at least one item already has been choosen.
4. **Cart**, here is listed all items choosen, with the price, descount and the final value, the basket can be finished and save on the database. Can be access by Checkout button, on the Cart, if has items.


**Wiremock**

Is the mock api, only with the adjust to work inside on the network of docker.


