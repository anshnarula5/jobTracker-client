"use client"
import React, { useEffect, useState } from 'react'
import StatusCard from '../components/StatusCard'
import { APPLIED, COLD, INTERVIEW, REFERRED, REFREQ, StatusList, StatusMap, } from '../utils/Constants'

import { DndContext } from '@dnd-kit/core'
import { Application } from '../utils/Types'
import { deleteApplication, getAllApplications, updateApplicationStatus } from '../rest/apiService'
import DeletionArea from './DeletionArea'
import withAuth from '../rest/withAuth'
import { useDispatch, useSelector } from 'react-redux'
import { createAlert } from '@/redux/features/alertSlice'
import Loading from '../components/Loading'

const Dashboard = () => {
  const dispatch = useDispatch()
  const userState = useSelector((state: any) => state.authReducer.value)
  const [isLoading, setIsLoading] = useState(false);
  const authtoken = userState.authToken;

  const [coldApplications, setColdApplications] = useState<Application[]>([]);
  const [refreqApplications, setRefReqApplications] = useState<Application[]>([]);
  const [referredApplications, setReferredApplications] = useState<Application[]>([]);
  const [appliedApplications, setAppliedApplications] = useState<Application[]>([]);
  const [intApplications, setIntApplications] = useState<Application[]>([]);
  const [updateStatus, setUpdateStatus] = useState<any>({})
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [newApplication, setNewApplication] = useState<boolean>(false)
  const getAppliedApplications = async () => {
    const apps = await getAllApplications("applied", authtoken)
    return apps
  }

  const getRefReqApplications = async () => {
    const apps = await getAllApplications("referralRequested", authtoken)
    return apps
  }
  const getReferredApplications = async () => {
    const apps = await getAllApplications("referred", authtoken)
    return apps
  }
  const getColdApplications = async () => {
    const apps = await getAllApplications("cold", authtoken)
    return apps
  }
  const getInterviewApplications = async () => {
    const apps = await getAllApplications("interview", authtoken)
    return apps
  }
  const getApplications = async () => {
    setIsLoading(true)
    const [applied, refereq, referred, cold, interview] = await Promise.all([getAppliedApplications(), getRefReqApplications(), getReferredApplications(), getColdApplications(), getInterviewApplications()])
    setAppliedApplications(applied)
    setColdApplications(cold)
    setRefReqApplications(refereq)
    setReferredApplications(referred)
    setIntApplications(interview)
    setIsLoading(false)
  }
  const fn = async (jobId: any, status: any, parent: any, application: Application) => {
    if (status === parent) {
      setIsMoving(false)
      return
    }
    if (status < parent) {
      dispatch(createAlert({
        message: "Can't go back in sequence, it will mess up summary",
        type: "error"
      }))
      return
    }

    switch (status) {
      case 2:
        setReferredApplications([application, ...referredApplications])
        break;
      case 3:
        setAppliedApplications([application, ...appliedApplications])
        break;
      case 1:
        setRefReqApplications([application, ...refreqApplications])
        break;
      case 0:
        setColdApplications([application, ...coldApplications])
        break;
      case 4:
        setIntApplications([application, ...intApplications])
        break;
      case "delete":
        await deleteApplication(jobId, authtoken)
        dispatch(createAlert({
          message: "Deleted   application",
          type: "success"
        }))
        break;
    }
    switch (parent) {
      case 2:
        setReferredApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 3:
        setAppliedApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 1:
        setRefReqApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 0:
        setColdApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      case 4:
        setIntApplications((prev) =>
          prev.filter((app) => app.id !== jobId)
        );
        break;
      default:
        break;
    }
    console.log("Updating")
    if (status != "delete") await updateApplicationStatus(jobId, StatusList[status], authtoken)
    console.log("Done")
    setIsMoving(false)
  }

  useEffect(() => {
    getApplications()
  }, [newApplication])

  useEffect(() => {
    fn(updateStatus.jobId, updateStatus.status, updateStatus.parent, updateStatus.application)
  },
    [updateStatus])

  function handleDragEnd(event: any) {
    // console.log("END", event)
    setIsMoving(false)
    const startingCol = event.active.data.current?.parent ?? "";
    const updatedApplication = event.active.data.current?.application ?? {};
    const endingCol = event.over?.id;
    const jobId = event.active?.id
    if (endingCol === undefined) return
    setUpdateStatus({
      jobId,
      status: endingCol,
      parent: startingCol,
      application: updatedApplication
    })
    console.log("Job Id : " + jobId + " From : " + startingCol + " TO : " + endingCol)
  }
  function handleDragStart(event: any) {
    setIsMoving(true)
    // console.log("START", event)
  }


  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
    {isLoading ? (
      <div className='bg-slate-900 min-h-screen'>
        <Loading />
      </div>
    ) : (
      <div className='flex flex-col sm:flex-row px-4 py-3 sm:px-8 sm:py-6 flex-wrap justify-between items-start bg-slate-900 min-h-screen gap-3'>
        <StatusCard statusName={COLD} applications={coldApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={REFREQ} applications={refreqApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={REFERRED} applications={referredApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={APPLIED} applications={appliedApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
        <StatusCard statusName={INTERVIEW} applications={intApplications} setNewApplication={setNewApplication} newApplication={newApplication} />
      </div>
    )}
  
    {isMoving && <DeletionArea />}
  </DndContext>
  
  )
}

export default withAuth(Dashboard)


