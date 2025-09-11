"use client"; // Only if using App Router

import React, { useEffect, useState } from "react";

// Interfaces
interface House {
  id: number;
  name: string;
}

interface Member {
  id: number;
  name: string;
}

interface AllocateHouse {
  id: number;
  houseId: number;
  memberId: number;
  allocationDate: string;
  releaseDate?: string | null;
  house: House;
  member: Member;
}

export default function AllocateHouses() {
  const [allocations, setAllocations] = useState<AllocateHouse[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [newHouseId, setNewHouseId] = useState<number | undefined>();
  const [newMemberId, setNewMemberId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAllocations() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/AllocateHouses");
      if (!res.ok) throw new Error("Failed to fetch allocations");
      const data: AllocateHouse[] = await res.json();
      setAllocations(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHouses() {
    try {
      const res = await fetch("/api/Houses");
      if (!res.ok) throw new Error("Failed to fetch houses");
      const data: House[] = await res.json();
      setHouses(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchMembers() {
    try {
      const res = await fetch("https://localhost:7255/api/Members");
      if (!res.ok) throw new Error("Failed to fetch members");
      const data: Member[] = await res.json();
      setMembers(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchAllocations();
    fetchHouses();
    fetchMembers();
  }, []);

  async function createAllocation() {
    if (!newHouseId || !newMemberId) {
      alert("Please select both house and member.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/AllocateHouses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ houseId: newHouseId, memberId: newMemberId }),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to create allocation");
      }
      await fetchAllocations();
      setNewHouseId(undefined);
      setNewMemberId(undefined);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function releaseAllocation(id: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://localhost:7255/api/AllocateHouses/${id}/release`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to release allocation");
      }
      await fetchAllocations();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">🏠 Allocate Houses</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Create Allocation */}
      <div className="card mb-4">
        <div className="card-header">Create New Allocation</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createAllocation();
            }}
          >
            <div className="row g-3 align-items-end">
              <div className="col-md-5">
                <label htmlFor="houseSelect" className="form-label">
                  Select House
                </label>
                <select
                  className="form-select"
                  id="houseSelect"
                  value={newHouseId ?? ""}
                  onChange={(e) => setNewHouseId(Number(e.target.value))}
                >
                  <option value="">-- Select House --</option>
                  {houses.map((house) => (
                    <option key={house.id} value={house.id}>
                      {house.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-5">
                <label htmlFor="memberSelect" className="form-label">
                  Select Member
                </label>
                <select
                  className="form-select"
                  id="memberSelect"
                  value={newMemberId ?? ""}
                  onChange={(e) => setNewMemberId(Number(e.target.value))}
                >
                  <option value="">-- Select Member --</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2 d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Allocate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Allocations Table */}
      <div className="card">
        <div className="card-header">Current Allocations</div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
            </div>
          ) : allocations.length === 0 ? (
            <div className="text-center py-3">No allocations found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered m-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>House</th>
                    <th>Member</th>
                    <th>Allocated At</th>
                    <th>Released At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((alloc) => (
                    <tr key={alloc.id}>
                      <td>{alloc.id}</td>
                      <td>{alloc.house?.name}</td>
                      <td>{alloc.member?.name}</td>
                      <td>{new Date(alloc.allocationDate).toLocaleString()}</td>
                      <td>
                        {alloc.releaseDate ? (
                          new Date(alloc.releaseDate).toLocaleString()
                        ) : (
                          <span className="badge bg-warning">Not Released</span>
                        )}
                      </td>
                      <td>
                        {!alloc.releaseDate && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => releaseAllocation(alloc.id)}
                            disabled={loading}
                          >
                            Release
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
