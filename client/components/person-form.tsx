"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPerson, updatePerson } from "@/lib/api"
import type { Person } from "@/types/person"
import { useToast } from "@/hooks/use-toast"

interface PersonFormProps {
  isOpen: boolean
  onClose: () => void
  person: Person | null
  onSuccess: () => void
}

export function PersonForm({ isOpen, onClose, person, onSuccess }: PersonFormProps) {
  const [formData, setFormData] = useState<Person>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (person) {
      setFormData(person)
    } else {
      setFormData({ firstName: "", lastName: "", email: "", age: 0 })
    }
  }, [person])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (person?.id) {
        await updatePerson(person.id, formData)
        toast({ title: "Success", description: "Person updated successfully." })
      } else {
        await createPerson(formData)
        toast({ title: "Success", description: "Person created successfully." })
      }
      onSuccess()
    } catch (err) {
      toast({ title: "Error", description: "An error occurred.", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>{person ? "Edit Person" : "Add New Person"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="bg-secondary/50 border-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="bg-secondary/50 border-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-secondary/50 border-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || 0 })}
              required
              className="bg-secondary/50 border-none"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : person ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
