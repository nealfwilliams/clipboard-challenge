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

### Ticket 1 - Add CustomId table
A table should be set up to facilitate a many-to-many relationship between agents and facilities.
The purpose of this table is to facilities adding custom ids for each agent.
The relevant columns of this table will be the `agent_id` (a FK to the Agents table), `facility_id` (a FK to Facilities
table), and a string column `custom_id`.
The table should have a uniqueness constraint for `agent_id` and `facility_id`, so each agent will only have one custom
id per facility.
The table should have a uniqueness constraint for `facility_id` and `custom_id` to prevent duplicate ids

Assuming an ORM such as prisma or Django is used, the acceptance criteria for this ticket is updating the existing DB models and creating the migration files to facilitate this change

Estimate: 2 storypoints

### Ticket 2 - Update getShiftsByFacility method
The `getShiftsByFacility` endpoint will need to be modified to return the custom_id for each agent as part of the metadata

Estimate: 1 storypoint

### Ticket 3 - Expose custom id logic in API
New API methods will be needed to accomplish support setting custom ids
- `setAgentCustomId(facilityId, agentId, customId)` - this function will take in a custom_id, a facility_id, and a
custom_id, and create a new row in the CustomId table for this custom id. If either of the uniqueness constraints for
this table are violated, the endpoint should return an informative error that clarifies the collision. This API should
include a permission check so only admins of a specific facility can add new custom ids for that facility.
- `getAgentsByFacility(facilityId)` - this method will return a list of agents who have shifts with a facility, along with metadata for that agent, including any custom id

Estimate: 3 storypoints

### Ticket 4 - Add UI for reading and updating custom id logic
Users will need an interface to see which agents are assigned which id and to add new custom ids.

This UI can be presented as a table. The `getShiftsByAgent` method will be able to provide data about which agents work at which facilities. Each table row will link to a form that will also the user to submit new ids to the `setAgentCustomId` API.

Estimate: 8 storypoints

### Ticket 5 - Update generateReport to use custom ids where applicable
Method `generateReport` will need to be updated to use the custom id for each agent rather than the auto-generated id, if a custom id is available.

I would provide more details about acceptance criteria, etc. for these tickets, but I am out of time. 
