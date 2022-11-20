FROM openjdk:8

ADD ./build/libs/member-service-0.0.1-SNAPSHOT.jar MemberService.jar

CMD ["java","-jar","MemberService.jar"]

# docker build -t wornjs135/beedly_spring .
# docker push wornjs135/beedly_spring
# docker run -d -p 8080:8080 --name beedly wornjs135/beedly_spring:latest
