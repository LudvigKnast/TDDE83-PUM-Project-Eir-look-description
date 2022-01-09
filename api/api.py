"""A Python Flask API for project EIR.
Classes
-------
PatientInList
Personnel
Ordination
Medicine
Timeline
Teams
ECGTime
patientInOverview
Lab

Functions
-------
get_current_time()
get_patients()
get_one_patient_overview(patient_id)
get_one_patient(patient_id)
get_ecg_list(patient_id)
get_ecg(patient_id, list_id)
pbs(patient_id):
assessment(patient_id)
get_ordinations(patient_id)
get_medicine(patient_id)
get_journal(patient_id)
get_timeline(patient_id)
get_personnel()
getpersonnel(team_id)
get_teams()
get_lab(patient_id)
get_ums(patient_id)
"""

import time
import json
from flask import Flask, jsonify
app = Flask(__name__)



@app.route('/api/time')
def get_current_time():
    """A function that returns the current time"""

    return {'time': time.time()}


class PatientInList():
    """A class to represent a patient in a list"""

    def __init__(
        self, patient_id, first_name, last_name, gender, ssn, new_lab_result, new_info,
        time_to_checkup,cause, team, time_er, breathing_frequence, pulse, blood_sys,
        blood_dia, saturation, temp, rls, room
        ):
        self.id = patient_id
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.ssn = ssn
        self.new_lab_result = new_lab_result
        self.new_info = new_info
        self.time = time_to_checkup
        self.cause = cause
        self.team = team
        self.time_er = time_er
        self.breathing_frequence = breathing_frequence
        self.pulse = pulse
        self.blood_sys=blood_sys
        self.blood_dia = blood_dia
        self.saturation = saturation
        self.temp = temp
        self.rls = rls
        self.room = room

    def serialize(self):
        """A method to serialize"""

        return dict(
            id = self.id,
            firstName = self.first_name,
            lastName = self.last_name,
            gender = self.gender,
            ssn = self.ssn,
            newLabResult = self.new_lab_result,
            newInfo = self.new_info,
            time = self.time,
            cause = self.cause,
            team = self.team,
            timeEr = self.time_er,
            breathingFrequence=self.breathing_frequence,
            pulse=self.pulse,
            bloodSys=self.blood_sys,
            bloodDia = self.blood_dia,
            saturation=self.saturation,
            temp= self.temp,
            rls=self.rls,
            room=self.room
            )

class Personnel():
    """A class to represent the personnel"""

    def __init__(self, personnel_id, name, role, shift_start, shift_end, team):
        self.personnel_id = personnel_id
        self.name = name
        self.role = role
        self.shift_start = shift_start
        self.shift_end = shift_end
        self.team = team

    def serialize(self):
        """A method to serialize"""

        return dict(
            id=self.personnel_id,
            name=self.name,
            role=self.role,
            shiftStart=self.shift_start,
            shiftEnd=self.shift_end,
            team=self.team
            )


class Ordination():
    """A class to represent the ordination of medicine"""

    def __init__(
        self, ordination_id, patient_id, medicine, instant, intake,
        dosage, amount, start_time, end_time, drip_info
        ):

        self.id = ordination_id
        self.patient_id = patient_id
        self.medicine = medicine
        self.instant = instant
        self.intake = intake
        self.dosage = dosage
        self.amount = amount
        self.start_time = start_time
        self.end_time = end_time
        self.drip_info = drip_info

    def serialize(self):
        """A method to serialize"""

        return dict(
            id=self.id,
            medicine=self.medicine,
            instant=self.instant,
            intake=self.intake,
            dosage=self.dosage,
            amount=self.amount,
            startTime=self.start_time,
            endTime=self.end_time,
            dripInfo=self.drip_info
            )


class Medicine():
    """A class to represent the medicine"""

    def __init__(
        self, medicine_id, patient_id, medicine, intake, dosage, interval, start_date, end_date
        ):
        self.id = medicine_id
        self.patient_id = patient_id
        self.medicine = medicine
        self.intake = intake
        self.dosage = dosage
        self.interval = interval
        self.start_date = start_date
        self.end_date = end_date

    def serialize(self):
        """A method to serialize"""

        return dict(
            id=self.id,
            medicine=self.medicine,
            intake=self.intake,
            dosage=self.dosage,
            interval=self.interval,
            startDate=self.start_date,
            endDate=self.end_date
            )


class Timeline():
    """A class to represent the timeline"""

    def __init__(self, time_line_id, point_in_time, event, by_who, _type, info):
        self.id = time_line_id
        self.time = point_in_time
        self.event = event
        self.by_who = by_who
        self._type = _type
        self.info = info

    def serialize(self):
        """A method to serialize"""

        return dict(
            id = self.id,
            time = self.time,
            event = self.event,
            byWho = self.by_who,
            type = self._type,
            info = self.info
            )

class Teams():
    """A class to represent the teams"""

    def __init__(self, team_id):
        self.id = team_id

    def serialize(self):
        """A method to serialize"""

        return dict(id=self.id)


class EcgTime():
    """A class to represent the times in the ECG"""

    def __init__(self, point_in_time, date):
        self.time = point_in_time
        self.date = date

    def serialize(self):
        """A method to serialize"""

        return dict(time=self.time, date=self.date)


class PatientInOverview():
    """A class to represent the patient overview"""

    def __init__(
        self, patient_id, ssn, cause, sickness, health_problem, patient_needs, temp, nrs, ACVPU
        ):
        self.id = patient_id
        self.ssn = ssn
        self.cause = cause
        self.sickness = sickness
        self.health_problem = health_problem
        self.patient_needs = patient_needs
        self.temp = temp
        self.nrs = nrs
        self.ACVPU = ACVPU

    def serialize(self):
        """A method to serialize"""

        return dict(
            id=self.id,
            ssn=self.ssn,
            cause=self.cause,
            sickness=self.sickness,
            healthProblem=self.health_problem,
            patientNeeds=self.patient_needs,
            temp=self.temp,
            nrs=self.nrs,
            ACVPU=self.ACVPU
            )


class Lab():
    """A class to represent the lab results"""

    def __init__(self, lab_id, klinisk_kemi, radiologi):
        self.lab_id = lab_id
        self.klinisk_kemi = klinisk_kemi
        self.radiologi = radiologi

    def serialize(self):
        """A method to serialize"""

        return dict(id=self.lab_id, klinisk_kemi = self.klinisk_kemi, radiologi = self.radiologi)


@app.route('/api/getpatients')
def get_patients():
    """A function that returns all patients"""

    patients = []
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        patient = PatientInList(
            item["id"], item["firstName"], item["lastName"], item["gender"], item["ssn"],
            item["new_lab_result"], item["new_info"], item["time"],
            item["cause"], item["team"],item["time_er"], item["breathing_frequence"][10]["AF"],
            item["pbs"]["pulse"][10]["value"], item["pbs"]["bloodSys"][10]["value"],
            item["pbs"]["bloodDia"][10]["value"], item["pbs"]["saturation"][10]["value"],
            item["temp"][10]["temp"], item["assessment"]["rls"][10]["value"], item["room"]
            )
        patients.append(patient.serialize())

    return jsonify({"patients": patients})

    # for item in data:
    #     # ret.append(jsonify({
    #     #     "firstName": item["firstName"],
    #     #     "lastName": item["lastName"], "id": item["id"]
    #     #     }))
    #     temp = {
    #         "firstName": item["firstName"], "lastName": item["lastName"],
    #         "indication_type": item["indication_type"], "time": item["time"],
    #         "triage": ["triage"]
    #         }
    #     ret.append(json.dumps(temp))
    # return jsonify({"patients": ret})

@app.route('/api/getonepatientoverview/<int:patient_id>')
def get_one_patient_overview(patient_id):
    """A function that returns the patient overview for one patient"""

    ret = []
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == patient_id:
            patient = PatientInOverview(
                item["id"], item["ssn"], item["cause"], item["sickness"],item["health_problem"],
                item["patient_needs"], item["temp"][len(item["temp"])-1]["temp"],
                item["assessment"]["nrs"][len(item["assessment"]["nrs"])-1]["value"], item["ACVPU"]
                )
            ret.append(patient.serialize())

    return jsonify({"patient": ret})

@app.route('/api/getonepatient/<int:patient_id>')
def get_one_patient(patient_id):
    """A function that returns the information about one patient"""

    ret = {}

    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["id"] == patient_id:
            ret = item

    return jsonify({"patient": ret})


@app.route('/api/getecglist/<int:patient_id>')
def get_ecg_list(patient_id):
    """A function that returns the timestamps of the ECG for one patient"""

    ecg = {}
    times = []
    with open('patients.json', encoding='utf-8') as f:
        with open('ecg_timestamps.json', encoding='utf-8') as fh:
            data = json.load(f)
            time_data = json.load(fh)
            for item in data:
                if item["id"] == patient_id:
                    ecg = item["ecgList"]
                    for index in ecg:
                        times.append(time_data[index])
            return jsonify({"ecgList": ecg, "timeList": times})


@app.route('/api/getECG/<int:patient_id>/<int:list_id>')
def get_ecg(patient_id, list_id):
    """A function that returns ECG for one patient and list"""

    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == patient_id:
            with open("mock_master.json", 'r', encoding='utf-8') as f:
                mock_arr = json.load(f)
                print(item["ecgList"])
                print(list_id-1)
                return mock_arr[item["ecgList"][list_id-1]]
                # for item[...]=[6,7] listId-1=6, should be 1
    return jsonify()

#@app.route('/api/getecgtimelist/<list>')
#def get_ecg_time_list(list):
#    ret = []
#    with open('ecg_timestamps.json', encoding='utf-8') as fh:
#        data = json.load(fh)
#    for index in list:
#        temptime = EcgTime(data[index]["time"], data[index]["date"])
#        ret.append(temptime.serialize())
#    return jsonify({"timeList": ret})


@app.route('/api/pbs/<int:patient_id>')
def pbs(patient_id):
    """A function that returns pbs for one patient"""

    ret = {}
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == patient_id:
            ret = item["pbs"]

    return jsonify({"patient": ret})


@app.route('/api/assessment/<int:patient_id>')
def assessment(patient_id):
    """A function that returns the assessment for one patient"""

    ret = {}
    with open('patients.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == patient_id:
            ret = item["assessment"]

    return jsonify({"patient": ret})


@app.route('/api/getordination/<int:patient_id>')
def get_ordinations(patient_id):
    """A function that returns the ordinations for one patient during the visit"""

    ordinations = []

    with open('ordinations.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["patient_id"] == patient_id:
            ordination = Ordination(
                item["id"], item["patient_id"], item["medicine"], item["instant"],
                item["intake"], item["dosage"], item["amount"], item["start_time"],
                item["end_time"], item["drip_info"]
                )
            ordinations.append(ordination.serialize())

    return jsonify({"ordinations": ordinations})


@app.route('/api/getmedicine/<int:patient_id>')
def get_medicine(patient_id):
    """A function that returns the medicine a patient has previously taken"""

    medicines = []

    with open('medicine.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["patient_id"] == patient_id:
            medicine = Medicine(
                item["id"], item["patient_id"], item["medicine"], item["intake"],
                item["dosage"], item["interval"], item["start_date"], item["end_date"]
                )
            medicines.append(medicine.serialize())

    return jsonify({"medicines": medicines})

@app.route('/api/getjournal/<int:patient_id>')
def get_journal(patient_id):
    """A function that returns the journal for one patient"""

    patient_id =- 1
    #delete this line if all patients get their own journal,
    #cause all patient share same journal atm

    with open('journal.json', encoding='utf-8') as fh:
        data = json.load(fh)

        for item in data:
            if item["id"] != patient_id:
                return jsonify(item["journal"])
        return jsonify()


@app.route('/api/gettimeline/<int:patient_id>')
def get_timeline(patient_id):
    """A function that returns the timeline for the patient's visit"""

    timeline_objects = []

    with open('timeline.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["id"] == patient_id:
            for t in item["timeline"]:
                timeline = Timeline(
                    t["id"], t["time"], t["event"], t["by_who"], t["type"], t["info"]
                    )
                timeline_objects.append(timeline.serialize())

    return jsonify({"timeline": timeline_objects})


@app.route('/api/getpersonnel')
def get_personnel():
    """A function that return the personnel"""

    personnel = []
    with open('personnel.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        person = Personnel(item["id"], item["firstName"] + " " + item["lastName"],
                           item["role"], item["shift_start"], item["shift_end"], item["team"])
        personnel.append(person.serialize())

    return jsonify({"personnel": personnel})


@app.route('/api/getpersonnel/<int:team_id>')
def getpersonnel(team_id):
    """A function that returns the personnel of a team"""

    ret = {}
    with open('personnel.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["id"] == team_id:
            ret = item

    return jsonify({"personnel": ret})


@app.route('/api/getteams')
def get_teams():
    """A function that returns the teams"""

    teams = []
    with open('teams.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        team = Teams(item["id"])
        teams.append(team.serialize())

    return jsonify({"teams": teams})

@app.route('/api/getlab/<int:patient_id>')
def get_lab(patient_id):
    """A function that returns the lab results of a patient"""

    with open('lab.json', encoding='utf-8') as fh:
        data = json.load(fh)

    for item in data:
        if item["id"] == patient_id:
            lab = Lab(
                lab_id=item["id"], klinisk_kemi=item["klinisk_kemi"], radiologi=item["radiologi"]
                )

    return jsonify({"lab": lab.serialize()})

@app.route('/api/getums/<int:patient_id>')
def get_ums(patient_id):
    """A function that returns the ums information for a patient"""

    ret = {}
    with open('ums-signals.json', encoding='utf-8') as fh:
        data = json.load(fh)
    for item in data:
        if item["patient_id"] == patient_id:
            ret = item

    return jsonify({"ums": ret})
