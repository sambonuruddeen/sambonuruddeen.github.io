
  // Replace {accessToken} with your LinkedIn API access token
  const url = `https://api.linkedin.com/v2/people/(id:urn:li:person:{personId})?projection=(id,first-name,last-name,profilePicture(displayImage~:playableStreams),vanityName,email,headline,industry,location,summary,positions,educations,certifications,skills:(id,skill:(name)))`;

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'cache-control': 'no-cache',
      'X-Restli-Protocol-Version': '2.0.0'
    }
  })
    .then(response => response.json())
    .then(data => {
      const qualificationsList = document.getElementById('linkedin-qualifications');

      // Iterate over the qualifications data and create HTML elements for each qualification
      data.educations.elements.forEach(qualification => {
        const schoolName = qualification.schoolName;
        const degreeName = qualification.degreeName;
        const fieldOfStudy = qualification.fieldOfStudy;
        const startDate = qualification.timePeriod.startDate.year;
        const endDate = qualification.timePeriod.endDate.year;

        const qualificationElement = document.createElement('div');
        qualificationElement.innerHTML = `
          <span>${degreeName}</span>
          <a href="#">${schoolName}</a>
          <span>${startDate} - ${endDate}</span>
        `;

        qualificationsList.appendChild(qualificationElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
