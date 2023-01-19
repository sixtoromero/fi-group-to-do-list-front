import HttpClient  from '../services/HttpClient';

export const registerTask = task => {
    return new Promise((resolve, eject) => {
      HttpClient.post('/Task/InsertAsync', task).then(response => {
        resolve(response);
      });
    });
}

export const updateTask = task => {  
  return new Promise((resolve, eject) => {
    HttpClient.put('/Task/UpdateAsync', task).then(response => {
      resolve(response);
    });
  });
}

export const deleteTask = task => {  
  return new Promise((resolve, eject) => {
    HttpClient.delete('/Task/DelAsync?Id=' + task).then(response => {
      resolve(response);
    });
  });
}

export const getAllTask = task => {
    return new Promise((resolve, eject) => {
      HttpClient.get('/Task/GetAllAsync').then(response => {
        resolve(response);
      });
    });
}
