### Exercise
```javascript
function calculateScore(array) {
    return array.reduce((score, number) => {
        return score + (number % 2 === 0 ? 1 : (number === 5 ? 5 : 3));
    }, 0);
}
```
### Answers
1) a
2) b
3) d
4) a
5) b
6) c
7) b
8) d

###### Question: Given a distributed system that experiences latencies and occasional failures in one of its microservices, how would you optimize it?
##### Describe your approach to identifying the problem, possible solutions, and how you would ensure high availability and resilience

I think that first we have to identify the problem through logs, have a monitoring system that allows us to see latency, failed requests and all that. A possible solution if the problem is latency is to use Load Balancing. This allows us to distribute the requests to the replicas of our server.
Another solution to reduce unnecessary requests would be to use a cache, in this way we reduce times
Another solution would be to scale horizontally, put more instances of the microservice and use an orchestrator like kubernetes to control if an instance fails, a new one is raised.



### For run the project
1. Clone .env.template to .env and configure of variable enviroments
2. Execute `npm install` for install of dependences
3. You need to mongo, you can configure the docker-compose.yml and execute `docker compose up -d`
4. Execute `npm run dev` for launch the project in development mode