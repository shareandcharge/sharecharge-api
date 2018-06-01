declare enum CommandState {
    RequestSent = 1,
    RequestConfirmed = 2,
    SessionStarted = 3
}
declare class RequestTracker {
    private requests;
}
