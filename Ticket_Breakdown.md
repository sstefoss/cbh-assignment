# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Allow Agent model to support custom IDs

##### Description

Currently `Agents` in our database are identified only by their internal IDs. We need to improve the `Agent` model to accommodate custom IDs provided by facilities. This enhancement will allow facilities to assign and use their own unique IDs for agents when generating reports. Please keep in mind that some facilities may choose not to use this custom id. In that case, during the database migration we will default the field to `null` and continue using the internal id, like we are doing so far.

##### Acceptance criteria:

- Add a new field called `custom_facility_id` (__nullable__, __unique__) to the Agent model, allowing facilities to store their custom IDs.
- Migrate existing data to populate the `custom_facility_id` field and set default to `null`.

##### Implementation details:
1. Modify the database schema to include the `custom_facility_id` field in the Agents table.
2. Update the `Agent` model in the application code to reflect the new field.
3. Create a migration script to transfer existing data to the `custom_facility_id` field, considering cases where no custom ID is available.
4. Verify the proper functioning of the updated "Agent" model using unit tests.

##### Time estimation:
3 hours

### Ticket 2: Include `custom_facility_id` in getShiftsByFacility function

##### Description

The `getShiftsByFacility` function currently retrieves Shifts worked by Agents for a specific Facility. We need to enhance this function to fetch and provide the `custom_facility_id` assigned by Facilities for each Agent.

##### Acceptance criteria:

- Update the `getShiftsByFacility` function to fetch the `custom_facility_id` field along with other Shift metadata.

##### Implementation details:
1. Refine the query in the `getShiftsByFacility` function to join the Agents table and fetch the `custom_facility_id` field.
2. Modify the response data structure to incorporate the `custom_facility_id` for each Agent.

##### Time estimation:
1.5 hours

### Ticket 3: Modify `generateReport` function to utilize custom Agent IDs

##### Description

The `generateReport` function is responsible for converting Shifts into PDF reports. We need to modify this function to utilize the agents' `custom_facility_id` provided by Facilities instead of the internal database IDs.

##### Acceptance criteria:

- Adapt the `generateReport` function to retrieve the `custom_facility_id` field for each agent and incorporate it into the generated PDF report.
- Display the `custom_facility_id` alongside the Agent's information within the report.

##### Implementation details:

1. Enhance the `generateReport` function to fetch the `custom_facility_id` field for each agent in the "Shifts" data.
2. Adjust the PDF generation code to include the `custom_facility_id` alongside the agent's  information.
3. Ensure the accurate display of `custom_facility_id` in the generated reports using unit tests.

##### Time estimation:
2 hours

### Ticket 4: Implement UI for managing custom Agent IDs

##### Description

Facilities require a user interface (UI) to manage and save the `custom_facility_id` for the agents they work with. We need to enhance the facility's admin UI to include this functionality. Please make sure that you use the already implemented elements from the design system and provide the standard CRUD UX.

##### Acceptance criteria:

- Allow facilities to add, edit and remove the unique `custom_facility_id` for their agents.

##### Implementation details:
1. Design and implement a new section in the facility's admin UI to facilitate the management of the `custom_facility_id` for each agent.
2. Create a form for adding and editing the `custom_facility_id`. Make sure to validate the uniqueness of it and also allow the field to be empty.
3. Show `custom_facility_id` field in the list of agents and add a button to allow the removal of it.

##### Time estimation:
5 hours

### Ticket 5: Enhance report submission process to include `custom_facility_id`.

##### Description

In order to improve the report submission process, we need to enhance it to include or select the `custom_facility_id` for each agent. This will allow facilities to enter their own `custom_facility_id` when submitting reports.

##### Acceptance criteria:

- Update the report submission process to allow facilities to enter the agent's data using its `custom_facility_id`.
- Include the `custom_facility_id` field for each agent in the submitted data.
- Ensure the `custom_facility_id` is associated correctly with the respective agent's data during the submission process.

##### Implementation details:
1. Identify the relevant code or API endpoint responsible for handling report submissions and modify it to include the `custom_facility_id` field when preparing the data for submission.
2. Verify the accurate association of the `custom_facility_id` with the corresponding agent during the submission process.
3. Create end to end tests to verify that the submissions process works as expected.

##### Time estimation:
2 hours
