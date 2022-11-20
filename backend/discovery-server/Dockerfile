FROM openjdk:8

ADD ./build/libs/discovery-server-0.0.1-SNAPSHOT.jar DiscoveryService.jar

CMD ["java","-jar","DiscoveryService.jar"]

# docker build -t wornjs135/beedly_spring .
# docker push wornjs135/beedly_spring
# docker run -d -p 8080:8080 --name beedly wornjs135/beedly_spring:latest
