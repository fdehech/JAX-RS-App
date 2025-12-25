import type { Person } from "@/types/person"

const API_BASE_URL = "http://localhost:8080/PersonREST/api/people"

export async function fetchPersons(): Promise<Person[]> {
  const res = await fetch(API_BASE_URL)
  if (!res.ok) throw new Error("Failed to fetch persons")
  return res.json()
}

export async function fetchPersonById(id: number): Promise<Person> {
  const res = await fetch(`${API_BASE_URL}/${id}`)
  if (!res.ok) throw new Error("Failed to fetch person")
  return res.json()
}

export async function createPerson(person: Person): Promise<Person> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  })
  if (!res.ok) throw new Error("Failed to create person")
  return res.json()
}

export async function updatePerson(id: number, person: Person): Promise<Person> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  })
  if (!res.ok) throw new Error("Failed to update person")
  return res.json()
}

export async function deletePerson(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete person")
}
