"use client"

import { useState, useEffect } from "react"
import { Plus, Search, MoreHorizontal, Trash2, Edit2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { PersonForm } from "./person-form"
import { deletePerson, fetchPersons } from "@/lib/api"
import type { Person } from "@/types/person"
import { useToast } from "@/hooks/use-toast"

export function PersonList() {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const { toast } = useToast()

  const loadPersons = async () => {
    try {
      setLoading(true)
      const data = await fetchPersons()
      setPersons(data)
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not load persons from backend.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPersons()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this person?")) return
    try {
      await deletePerson(id)
      setPersons(persons.filter((p) => p.id !== id))
      toast({ title: "Success", description: "Person deleted successfully." })
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete person.", variant: "destructive" })
    }
  }

  const filteredPersons = persons.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Persons</h1>
          <p className="text-muted-foreground">Manage your organization's members.</p>
        </div>
        <Button
          onClick={() => {
            setEditingPerson(null)
            setIsFormOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Person
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 bg-secondary/50 border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Name</th>
                <th className="px-6 py-4 text-left font-medium">Email</th>
                <th className="px-6 py-4 text-left font-medium">Age</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic">
                    Loading persons...
                  </td>
                </tr>
              ) : filteredPersons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic">
                    No persons found.
                  </td>
                </tr>
              ) : (
                filteredPersons.map((person) => (
                  <tr key={person.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-medium">
                          {person.firstName} {person.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{person.email}</td>
                    <td className="px-6 py-4">{person.age}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        Active
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingPerson(person)
                              setIsFormOpen(true)
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => person.id && handleDelete(person.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <PersonForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          person={editingPerson}
          onSuccess={() => {
            setIsFormOpen(false)
            loadPersons()
          }}
        />
      )}
    </div>
  )
}
