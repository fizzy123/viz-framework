function callTicketronTicketsReset() {
  s0.initImage("http://localhost:8000/images/tickets.png")
  s1.initImage("http://localhost:8000/images/tickets2.png")
  s2.initImage("http://localhost:8000/images/tickets3.png")
}

function callTicketronTickets() {
  srcBuf = randomChoice([s0, s1, s2])
  return src(srcBuf)
}
