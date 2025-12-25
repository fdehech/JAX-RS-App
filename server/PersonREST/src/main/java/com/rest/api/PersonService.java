package com.rest.api;

import com.rest.model.Person;
import com.rest.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/people")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonService {

    @POST
    public Person addPerson(Person person) {
        EntityManager em = JPAUtil.getEntityManager();
        em.getTransaction().begin();
        em.persist(person);
        em.getTransaction().commit();
        em.close();
        return person;
    }

    @GET
    public List<Person> getAll() {
        EntityManager em = JPAUtil.getEntityManager();
        List<Person> list = em.createQuery("SELECT p FROM Person p", Person.class)
                              .getResultList();
        em.close();
        return list;
    }

    @GET
    @Path("/{id}")
    public Person getById(@PathParam("id") int id) {
        EntityManager em = JPAUtil.getEntityManager();
        Person p = em.find(Person.class, id);
        em.close();
        return p;
    }

    @PUT
    @Path("/{id}")
    public Person update(@PathParam("id") int id, Person newPerson) {
        EntityManager em = JPAUtil.getEntityManager();
        em.getTransaction().begin();
        Person p = em.find(Person.class, id);
        if (p != null) {
            p.setFirstName(newPerson.getFirstName());
            p.setLastName(newPerson.getLastName());
            p.setEmail(newPerson.getEmail());
            p.setAge(newPerson.getAge());
        }
        em.getTransaction().commit();
        em.close();
        return p;
    }

    @DELETE
    @Path("/{id}")
    public String delete(@PathParam("id") int id) {
        EntityManager em = JPAUtil.getEntityManager();
        em.getTransaction().begin();
        Person p = em.find(Person.class, id);
        if (p != null) {
            em.remove(p);
        }
        em.getTransaction().commit();
        em.close();
        return "Deleted";
    }
}
