import { FilterInput, FilterSchema } from '@/filter-input';
import { Public } from '@/shared/auth/public.decorator';
import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { CreateEventInput, CreateEventSchema } from './dto/create-event.input';
import { UpdateEventInput, UpdateEventSchema } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

// const pubSub = new PubSub();

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly pubSub: PubSubService,
  ) {}

  @Public()
  @Subscription(() => Event, {
    resolve: (value: Event) => value,
    filter: (payload, variables) => {
      // return variables.slug !== payload.slug;

      console.log('payload', payload);
      console.log('variables', variables);

      if (payload.slug !== variables.slug) {
        return false;
      }

      return true;
    },
  })
  eventUpdated(@Args('slug', { type: () => String }) slug: string) {
    return this.pubSub.asyncIterableIterator('eventUpdated');
  }

  @CheckPoliciesApp(a => a.can('create', 'Event'))
  @Mutation(() => Event)
  createEvent(
    @ZodArgs(CreateEventSchema, 'input', {
      name: 'CreateEventInput',
      description: 'Create a new collective sale',
    })
    input: CreateEventInput,
  ) {
    return this.eventsService.create(input);
  }

  @CheckPoliciesApp(a => a.can('update', 'Event'))
  @Mutation(() => Event)
  updateEvent(@ZodArgs(UpdateEventSchema, 'input') input: UpdateEventInput) {
    return this.eventsService.update(input);
  }

  @CheckPoliciesApp(a => a.can('create', 'Closing'))
  @Mutation(() => Event)
  async toggleEventIsOpenedToReceiveSuggestions(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.toggleIsOpenedToReceiveSuggestions(id);
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Event'))
  @Query(() => [Event], { name: 'events' })
  findAll(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a event',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.eventsService.findAll(filter);
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Event'))
  @Query(() => Number)
  getTotalEvents(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a event',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.eventsService.findTotalEvents(filter);
  }

  @CheckPoliciesApp(a => a.can('get', 'Event'))
  @Query(() => Event, { name: 'event' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findById(id);
  }

  @Public()
  @Query(() => Event, { name: 'eventBySlug' })
  findBySlug(@Args('slug', { type: () => String }) slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @ResolveField()
  songs(@Parent() { id }: Event) {
    return this.eventsService.songs(id);
  }
}
