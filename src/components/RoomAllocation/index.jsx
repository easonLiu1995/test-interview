import React, { useEffect, useId, useMemo, useState } from 'react'
import isFunction from 'lodash/isFunction'
import cloneDeep from 'lodash/cloneDeep'
import PropTypes from 'prop-types'
import CustomInputNumber from '../CustomInputNumber'
import { DEFAULT_ROOM_ALLOCATION } from '../constant'

const RoomAllocation = ({ guest, room, onChange }) => {
  const initData = Array(room).fill(DEFAULT_ROOM_ALLOCATION)
  const [roomData, setRoomData] = useState(initData)
  const id = useId()

  const restPeople = useMemo(() => {
    const allocatedPeople = roomData.reduce((roomAccu, roomCurr) => {
      const totalPeple = Object.keys(roomCurr).reduce(
        (peopleAccu, peopleCurr) => (peopleAccu += roomCurr[peopleCurr]),
        0
      )
      return (roomAccu += totalPeple)
    }, 0)
    return guest - allocatedPeople
  }, [roomData])

  const handleRoomChange = ({ roomIndex, peopleNumber, peopleType }) => {
    setRoomData((prevRoom) => {
      const cloneRoom = cloneDeep(prevRoom[roomIndex])
      cloneRoom[peopleType] = peopleNumber
      return prevRoom.map((el, key) => (key === roomIndex ? cloneRoom : el))
    })
  }

  useEffect(() => {
    if (isFunction(onChange)) {
      onChange({ roomData })
    }
  }, [roomData])

  return (
    <section className="w-96 p-4 border-2 border-dashed border-black mr-10 last-of-type:mr-0 mb-10 last-of-type:mb-0">
      <h3 className="mb-2 text-lg">
        住客人數：{guest} 人 / {room} 房
      </h3>
      <div className="bg-blue-100 border rounded border-blue-200 p-4 my-4 font-[300]">
        尚未分配人數：{restPeople} 人
      </div>
      {roomData.map((currRoom, key) => (
        <div
          className="border-b border-gray-200 pb-4 mb-4 last-of-type:pb-0 last-of-type:mb-0 last-of-type:border-0"
          key={id + key}
        >
          <h3 className="mb-2 text-lg">
            房間：{currRoom.adult + currRoom.child}人
          </h3>
          {/* 如 data 包含其他詳細資料如 title 及 subtitle，room 裡的 config 還可以再 loop 一層 */}
          <div className="flex justify-between">
            <div className="pt-1 pb-2">
              <h4>大人</h4>
              <h5 className="text-gray-500">年齡 20+</h5>
            </div>
            <CustomInputNumber
              min={0}
              max={currRoom.adult + restPeople}
              name={`adult-${id + key}`}
              value={currRoom.adult}
              step={1}
              onChange={({ inputValue }) =>
                handleRoomChange({
                  roomIndex: key,
                  peopleNumber: inputValue,
                  peopleType: 'adult'
                })
              }
            />
          </div>

          <div className="flex justify-between">
            <h4 className="pt-1">小孩</h4>
            <CustomInputNumber
              min={0}
              max={currRoom.child + restPeople}
              name={`child-${id + key}`}
              value={currRoom.child}
              step={1}
              onChange={({ inputValue }) =>
                handleRoomChange({
                  roomIndex: key,
                  peopleNumber: inputValue,
                  peopleType: 'child'
                })
              }
            />
          </div>
        </div>
      ))}
    </section>
  )
}

RoomAllocation.propTypes = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onchange: PropTypes.func
}

export default RoomAllocation
